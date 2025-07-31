import { WebScrapingService } from '../service/web-scraping.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../type';
import { VehiclesAutoLandInformation } from '../interface/autoland-provider.interface';

@injectable()
export class Controller {
	constructor(@inject(TYPES.Service) private service: WebScrapingService) {}

	async generateData(): Promise<any> {
		await this.service.init();
	}
	async testSaveDatabase(): Promise<any> {
		try {
			const informationVehicule: VehiclesAutoLandInformation = {
				nombre: 'hoola',
			} as any;

			await this.service.saveDatabaseOnlyTest(informationVehicule);
		} catch (e) {
			console.log('Error controller agarrar,', e);
		}
	}
}
