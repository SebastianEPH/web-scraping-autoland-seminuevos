import { inject, injectable } from 'inversify';
import { VehiclesDao } from '../vehicles.dao';
import { KeyValuePair } from '../../interface/database.interface';
import { Column } from '../../common/enum';
import { TYPES } from '../../type';
import { Pool } from 'mysql2/promise';
import { AutolandSeminuevosModel } from '../../models/autoland-seminuevos.model';
import { DatabaseCreate } from '../../decorator/database.decorator';
import { DatabaseUtil } from '../../utils/database.util';
import { DatabaseQueryResult } from '../../models/database.interface';

@injectable()
export class VehiclesDaoMysql implements VehiclesDao {
	private readonly tableName: string = 'vehicles';

	constructor(
		@inject(TYPES.DatabaseClient)
		public database: Pool,
	) {}

	@DatabaseCreate
	public async create(request: AutolandSeminuevosModel): Promise<any> {
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
			[Column.brandsId, request?.brandId],
		];
		const { queryFieldInformation, queryInterface } = DatabaseUtil.createPrepare(this.tableName, keyValue);
		const [rows] = await this.database.query(queryInterface.query, queryFieldInformation.params);
		const { insertId } = new DatabaseQueryResult(rows);
		return insertId;
	}
}
