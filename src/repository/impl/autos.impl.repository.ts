import { AutosRepository } from '../autos.repository';
import { Pool } from 'mysql2/promise';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { Column } from '../../common/enum';
import { KeyValuePair } from '../../interface/database.interface';
import { DatabaseCreate } from '../../decorator/database.decorator';
import { DatabaseQueryResult } from '../../models/database.interface';
import { AutolandSeminuevosModel } from '../../models/autoland-seminuevos.model';

@injectable()
export class AutosImplRepository implements AutosRepository {
	public static readonly TABLE_NAME: string = 'vehicles';

	private readonly tableName: string = AutosImplRepository.TABLE_NAME;

	constructor(
		@inject(TYPES.DatabaseClient)
		public database: Pool,
	) {}

	@DatabaseCreate
	async create<T>(request: AutolandSeminuevosModel): Promise<DatabaseQueryResult> {
		const keyValue: KeyValuePair[] = [
			[Column.codeUnique, request?.codeUnique],
			[Column.name, request.name],
			[Column.year, request.year],
			[Column.modelYear, request?.modelYear],
			[Column.serialNumber, request?.serialNumber],
			[Column.licencePlate, request.licencePlate],
			[Column.milage, request?.milage],
			[Column.description, request?.description],
			[Column.isUsed, request?.isUsed],
			[Column.priceDollar, request.priceDollar],
			[Column.url, request.url],
			[Column.urlImg, request.urlImg],
			[Column.transmissionType, request.transmissionType],
			[Column.engineType, request.engineType],
			[Column.type, request.type],
			// /Soles y brandsId no están en el modelo pero sí en la tabla
			// [Column.priceSoles, request.priceSoles || 0], // Valor por defecto
			[Column.brandsId, null], // Debes obtener este valor de alguna relación
		];
		console.log('keyValue: ', keyValue);
		return keyValue as any;
	}
}
