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

	return container;
};
