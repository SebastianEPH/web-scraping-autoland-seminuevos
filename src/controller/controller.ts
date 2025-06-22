import { WebScrapingService } from '../service/web-scraping.service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../type';

@injectable()
export class Controller {
	constructor(@inject(TYPES.Service) private service: WebScrapingService) {}

	async generateData(): Promise<any> {
		await this.service.init();
	}
}
