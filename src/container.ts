import { AutolandSeminuevosServiceImpl } from './service/impl/autoland-seminuevos.service.impl';
import { WebScrapingServiceImpl } from './service/impl/web-scraping.service.impl';
import { AutolandSeminuevosService } from './service/autoland-seminuevos.service';
import { AutolandProviderImpl } from './provider/impl/autoland-provider.impl';
import { FilesStorageLocalImpl } from './storage/impl/files.storage.local';
import { VehiclesRepositoryMysqlImpl } from './repository/impl/vehicles.repository.mysql.impl';
import { WebScrapingService } from './service/web-scraping.service';
import { AutolandProvider } from './provider/autoland-provider';
import { VehiclesRepository } from './repository/vehicles.repository';
import { Environment } from './utils/constants-env.util';
import { FilesStorage } from './storage/files.storage';
import { ApiConnectorUtil } from './utils/api-connector';
import { Controller } from './controller/controller';
import { createPool, Pool } from 'mysql2/promise';
import { Container, interfaces } from 'inversify';
import { TIMEOUT } from './common/enum';
import { TYPES } from './type';
import { TAG } from './tag';
import { VehiclesDaoMysql } from './dao/impl/vehicles.dao.mysql';
import { VehiclesDao } from './dao/vehicles.dao';
import { BrandsDaoMysql } from './dao/impl/brands.dao.mysql';
import { BrandsDao } from './dao/brands.dao';

export const createContainer = (): Container => {
	const container: Container = new Container();
	const apiConnectorAutolandSeminuevos: ApiConnectorUtil = new ApiConnectorUtil({
		host: `https://autoland.com.pe`,
		timeout: TIMEOUT.PROVIDER,
	});

	container.bind<Controller>(TYPES.Handler).to(Controller);
	container.bind<WebScrapingService>(TYPES.Service).to(WebScrapingServiceImpl).whenTargetNamed(TAG.WebScraping);
	container
		.bind<interfaces.Factory<AutolandSeminuevosService>>(TYPES.Service)
		.toFactory<AutolandSeminuevosService>((context: interfaces.Context) => {
			return () => {
				return new AutolandSeminuevosServiceImpl(
					// context.container.getNamed<VehiclesRepository>(TYPES.Repository, TAG.AUTO),
					context.container.get<VehiclesRepository>(TYPES.Repository),
					context.container.get<AutolandProvider>(TYPES.AutolandProvider),
					context.container.get<FilesStorage>(TYPES.Storage),
				);
			};
		})
		.whenTargetNamed(TAG.Autoland);
	container.bind<FilesStorage>(TYPES.Storage).to(FilesStorageLocalImpl);

	container.bind<string[]>(TYPES.StorageSubPath).toConstantValue(['localStorage']).whenTargetNamed(TAG.StorageLocal);
	container
		.bind<string[]>(TYPES.StorageSubPath)
		.toConstantValue(['rutaa', 'blackBlas'])
		.whenTargetNamed(TAG.StorageBackblazeB2);

	container
		.bind<ApiConnectorUtil>(TYPES.ApiConnectorUtil)
		.toConstantValue(apiConnectorAutolandSeminuevos)
		.whenTargetNamed(TAG.Autoland);
	container.bind<AutolandProvider>(TYPES.AutolandProvider).to(AutolandProviderImpl);

	/* Repository */
	container.bind<VehiclesRepository>(TYPES.Repository).to(VehiclesRepositoryMysqlImpl);

	/* Dao */
	container.bind<VehiclesDao>(TYPES.DAO).to(VehiclesDaoMysql).whenTargetNamed(TAG.vehicle);
	container.bind<BrandsDao>(TYPES.DAO).to(BrandsDaoMysql).whenTargetNamed(TAG.brand);

	/* Database */
	const connection: Pool = createPool({
		host: Environment.DATABASE_MYSQL_HOST,
		port: +Environment.DATABASE_MYSQL_PORT,
		user: Environment.DATABASE_MYSQL_USER,
		database: Environment.DATABASE_MYSQL_DATABASE,
		password: Environment.DATABASE_MYSQL_PASSWORD,
		connectionLimit: +Environment.DATABASE_MYSQL_CONNECTION_LIMIT,
	});
	container.bind<Pool>(TYPES.DatabaseClient).toConstantValue(connection);

	return container;
};
