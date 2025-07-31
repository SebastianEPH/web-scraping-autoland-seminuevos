import { Container } from 'inversify';
import { ApiConnectorUtil } from './utils/api-connector';
import { TIMEOUT } from './common/enum';
import { TAG } from './tag';
import { AutolandProvider } from './provider/autoland-provider';
import { AutolandProviderImpl } from './provider/impl/autoland-provider.impl';
import { TYPES } from './type';
import { Controller } from './controller/controller';
import { WebScrapingService } from './service/web-scraping.service';
import { WebScrapingServiceImpl } from './service/impl/web-scraping.service.impl';
import { createPool, Pool } from 'mysql2/promise';
import { Environment } from './utils/constants-env.util';
import { AutosRepository } from './repository/autos.repository';
import { AutosImplRepository } from './repository/impl/autos.impl.repository';

export const createContainer = (): Container => {
	const container: Container = new Container();
	const apiConnectorAutolandSeminuevos: ApiConnectorUtil = new ApiConnectorUtil({
		host: `https://autoland.com.pe`,
		timeout: TIMEOUT.PROVIDER,
	});
	container.bind<Controller>(TYPES.Handler).to(Controller);
	container.bind<WebScrapingService>(TYPES.Service).to(WebScrapingServiceImpl);
	container
		.bind<ApiConnectorUtil>(TYPES.ApiConnectorUtil)
		.toConstantValue(apiConnectorAutolandSeminuevos)
		.whenTargetNamed(TAG.ProviderAutoland);
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

	/* Repository */
	container.bind<AutosRepository>(TYPES.Repository).to(AutosImplRepository).whenTargetNamed(TAG.AUTO);

	return container;
};
