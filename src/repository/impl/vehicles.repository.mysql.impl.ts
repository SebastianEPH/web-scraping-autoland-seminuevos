import { AutolandSeminuevosModel } from '../../models/autoland-seminuevos.model';
import { BrandDatabaseNative } from '../../dao/impl/brands.dao.mysql';
import { VehiclesRepository } from '../vehicles.repository';
import { BrandModel } from '../../models/brand.model';
import { inject, injectable, named } from 'inversify';
import { VehiclesDao } from '../../dao/vehicles.dao';
import { BrandsDao } from '../../dao/brands.dao';
import { Pool } from 'mysql2/promise';
import { TAG } from '../../tag';
import { TYPES } from '../../type';

@injectable()
export class VehiclesRepositoryMysqlImpl implements VehiclesRepository {
	private readonly tableName: string = 'vehicles';

	constructor(
		@inject(TYPES.DatabaseClient) public database: Pool,
		@inject(TYPES.DAO) @named(TAG.vehicle) public vehicleDao: VehiclesDao,
		@inject(TYPES.DAO) @named(TAG.brand) public brandDao: BrandsDao,
	) {}

	async saveDataVehicle<T>(autolandSeminuevosModel: AutolandSeminuevosModel): Promise<any> {
		const brands: BrandDatabaseNative[] = await this.brandDao.getAllByName(autolandSeminuevosModel.brand);
		autolandSeminuevosModel.brandId = brands?.[0]?.id;
		if (brands.length === 0) {
			autolandSeminuevosModel.brandId = await this.brandDao.create(
				new BrandModel({
					name: autolandSeminuevosModel.brand,
					codeUnique: autolandSeminuevosModel.brand.toUpperCase(),
				}),
			);
		}

		const idVehicle: number = await this.vehicleDao.create(autolandSeminuevosModel);
	}
}
