import { AutolandSeminuevosServiceImpl } from './service/impl/autoland-seminuevos.service.impl';
import { WebScrapingServiceImpl } from './service/impl/web-scraping.service.impl';
import { AutolandSeminuevosService } from './service/autoland-seminuevos.service';
import { AutolandProviderImpl } from './provider/impl/autoland-provider.impl';
import { FilesStorageLocalImpl } from './storage/impl/files.storage.local';
import { AutosImplRepository } from './repository/impl/autos.impl.repository';
import { WebScrapingService } from './service/web-scraping.service';
import { AutolandProvider } from './provider/autoland-provider';
import { AutosRepository } from './repository/autos.repository';
import { Environment } from './utils/constants-env.util';
import { FilesStorage } from './storage/files.storage';
import { ApiConnectorUtil } from './utils/api-connector';
import { Controller } from './controller/controller';
import { createPool, Pool } from 'mysql2/promise';
import { Container, interfaces } from 'inversify';
import { TIMEOUT } from './common/enum';
import { TYPES } from './type';
import { TAG } from './tag';

export const createContainer = (): Container => {
	const container: Container = new Container();
	const apiConnectorAutolandSeminuevos: ApiConnectorUtil = new ApiConnectorUtil({
		host: `https://autoland.com.pe`,
		timeout: TIMEOUT.PROVIDER,
	});
	/* Repository */
	container.bind<AutosRepository>(TYPES.Repository).to(AutosImplRepository).whenTargetNamed(TAG.AUTO);

	container.bind<Controller>(TYPES.Handler).to(Controller);
	container.bind<WebScrapingService>(TYPES.Service).to(WebScrapingServiceImpl).whenTargetNamed(TAG.WebScraping);
	container
		.bind<interfaces.Factory<AutolandSeminuevosService>>(TYPES.Service)
		.toFactory<AutolandSeminuevosService>((context: interfaces.Context) => {
			return () => {
				return new AutolandSeminuevosServiceImpl(
					context.container.getNamed<AutosRepository>(TYPES.Repository, TAG.AUTO),
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
