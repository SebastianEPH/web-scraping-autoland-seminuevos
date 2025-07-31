import { HTTP } from '../common/enum';
import { DatabaseException } from '../exception/database.exception';
import { DatabaseCodeError } from '../common/database.enum';
import { ToUser } from '../interface/response-to-user.interface';
import { KeyValuePair, QueryFieldInformation } from '../interface/database.interface';
import { DatabaseUtil } from '../utils/database.util';
import { QueryDatabaseUtil, queryInterface } from '../utils/database/query.database.util';
import { DatabaseQueryResult } from '../models/database.interface';

export function DatabaseCreate(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
	const originalMethod = descriptor.value;
	descriptor.value = async function (...args: any[]): Promise<any> {
		let queryWithParams: string = '';
		let query: string = '';
		let params: unknown[] = [];
		try {
			const keyValue: KeyValuePair[] = await originalMethod.apply(this, args);
			const queryFieldInformation: QueryFieldInformation = DatabaseUtil.getFieldInformation(keyValue);
			params = queryFieldInformation.params;
			const resusssslt: queryInterface = QueryDatabaseUtil.insert(this.tableName, queryFieldInformation);
			queryWithParams = resusssslt.queryWithParams;
			query = resusssslt.query;

			const [rows] = await this.database.query(query, params);
			return new DatabaseQueryResult(rows);
		} catch (error) {
			const response = new ToUser<object>();
			response.setUserMessage(`Error Interno, contactar con el administrador'`);
			response.setDevMessage(`message: '${error.sqlMessage}' | code: '${error.code}'`);
			response.setError({
				query: QueryDatabaseUtil.Beautiful(query),
				queryWithParams,
				paramsQuerySQL: params,
				error,
			});
			if (error.code === DatabaseCodeError.DUPLICATE) {
				response.setUserMessage(`Se esta intentando ingresar un registro que ya existe, el registro debe ser único`);
				throw new DatabaseException({
					statusCode: HTTP.STATUS_CODE_400,
					response,
				});
			}
			if (error.code === DatabaseCodeError.SYNTAX) {
				throw new DatabaseException({
					response,
				});
			}
			if (error.code === DatabaseCodeError.WRONG_VALUE_COUNT_ON_ROW) {
				response.setDevMessage(
					`Hay un campo que no cumple con el formato de la base de datos. | message: ${error.sqlMessage} | code: ${error.code}`,
				);
				throw new DatabaseException({
					response,
				});
			}
			if (error.code === DatabaseCodeError.ACCESS_DENIED) {
				response.setDevMessage(`Acceso denegado | message: ${error.sqlMessage} | code: ${error.code}`);
				throw new DatabaseException({
					response,
				});
			}
			if (error.code === DatabaseCodeError.TABLE_NAME) {
				response.setDevMessage(
					`Error al encontrar la base de datos, verifica el script | message: ${error.sqlMessage} | code: ${error.code}`,
				);

				throw new DatabaseException({
					response,
				});
			}
			if (error.code === DatabaseCodeError.ECONNREFUSED) {
				response.setDevMessage(
					`Error al conectar con la base de datos | message: ${error.sqlMessage} | code: ${error.code}`,
				);

				throw new DatabaseException({
					response,
				});
			}
			response.setDevMessage(`Error no controlado | message: ${error.sqlMessage} | code: ${error.code}`);
			throw new DatabaseException({
				response,
			});
		}
	};
}
