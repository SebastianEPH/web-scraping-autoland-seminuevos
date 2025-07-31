import { AutosRepository } from '../autos.repository';
import { Pool } from 'mysql2/promise';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { Column } from '../../common/enum';
import { KeyValuePair, QueryFieldInformation } from '../../interface/database.interface';
import { DatabaseCreate } from '../../decorator/database.decorator';
import { VehiclesAutoLandInformation } from '../../interface/autoland-provider.interface';
import { DatabaseQueryResult } from '../../models/database.interface';

@injectable()
export class AutosImplRepository implements AutosRepository {
	public static readonly TABLE_NAME: string = 'autos';

	private readonly tableName: string = AutosImplRepository.TABLE_NAME;

	constructor(
		@inject(TYPES.DatabaseClient)
		public database: Pool,
	) {}

	@DatabaseCreate
	async create<T>(request: VehiclesAutoLandInformation): Promise<DatabaseQueryResult> {
		const keyValue: KeyValuePair[] = [[Column.name, request?.nombre]];
		console.log('keyValue: ', keyValue);
		return;
	}
}
