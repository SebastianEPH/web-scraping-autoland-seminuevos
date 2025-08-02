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
import { BrandsDao } from '../brands.dao';
import { logger } from '../../decorator/logger.decorator';
import { BrandModel } from '../../models/brand.model';

export interface BrandDatabaseNative {
	id?: number;
	name: string;
	codeUnique: string;
	urlImg?: string;
}

@injectable()
export class BrandsDaoMysql implements BrandsDao {
	private readonly tableName: string = 'brands';

	constructor(
		@inject(TYPES.DatabaseClient)
		public database: Pool,
	) {}

	public async getAllByName(name: string): Promise<BrandDatabaseNative[]> {
		const query: string = `
			SELECT *
			FROM ${this.tableName}
			WHERE ${this.tableName}.${Column.name} = ?;
		`;
		const params: string[] = [name];
		const [rows] = await this.database.query(query, params);
		const results: BrandDatabaseNative[] = rows as BrandDatabaseNative[];

		return results.map((person: BrandDatabaseNative) => new BrandModel(person));
		// const responseDatabase: personFromDatabase[] = await this.connectionDatabase.queryGetWithException(query, params);
		// return Person.buildFromDatabase(responseDatabase);
	}

	public async getAllById(id: string): Promise<BrandModel[]> {
		const query: string = `
			SELECT *
			FROM ${this.tableName}
			WHERE ${this.tableName}.${Column.id} = ?;
		`;
		const params: string[] = [id];
		const [rows] = await this.database.query(query, params);
		const results: BrandDatabaseNative[] = rows as BrandDatabaseNative[];
		return results.map((person: BrandDatabaseNative) => new BrandModel(person));

		// const responseDatabase: personFromDatabase[] = await this.connectionDatabase.queryGetWithException(query, params);
		// return Person.buildFromDatabase(responseDatabase);
	}
	// public async getById(id: string): Promise<any > {
	// 	const query: string = `
	// 		SELECT ${this.COLUMNS}
	// 		FROM ${this.tableName}
	// 		WHERE ${this.tableName}.${Column.dni} = ?;
	// 	`;
	// 	const params: string[] = [dni];
	// 	const responseDatabase: personFromDatabase[] = await this.connectionDatabase.queryGetWithException(query, params);
	// 	return Person.buildFromDatabase(responseDatabase);
	// }

	@DatabaseCreate
	public async create(request: BrandDatabaseNative): Promise<number> {
		const keyValue: KeyValuePair[] = [
			[Column.name, request.name],
			[Column.codeUnique, request?.codeUnique],
			[Column.urlImg, request.urlImg],
		];
		const { queryFieldInformation, queryInterface } = DatabaseUtil.createPrepare(this.tableName, keyValue);
		const [rows] = await this.database.query(queryInterface.query, queryFieldInformation.params);
		const { insertId } = new DatabaseQueryResult(rows);
		return insertId;
	}
}
