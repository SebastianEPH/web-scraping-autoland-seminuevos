import { WebScrapingService } from '../web-scraping.service';
import promiseLimit from 'promise-limit';
import { inject, injectable, named } from 'inversify';
import { TYPES } from '../../type';
import { AutolandProvider } from '../../provider/autoland-provider';
import { VehiclesAutoLandInformation } from '../../interface/autoland-provider.interface';
import { TAG } from '../../tag';
import { AutolandSeminuevosService } from '../autoland-seminuevos.service';

@injectable()
export class WebScrapingServiceImpl implements WebScrapingService {
	private readonly limit = promiseLimit(1);

	constructor(
		@inject(TYPES.AutolandProvider) private autoland: AutolandProvider,
		@inject(TYPES.Service) @named(TAG.Autoland) private serviceAutoland: () => AutolandSeminuevosService,
	) {}

	async init(): Promise<void> {
		const {
			body: { data: vehiclesList },
		} = await this.autoland.listSeminuevos();

		const promiseVehiclesList: Promise<unknown>[] = vehiclesList.map((vehicle: VehiclesAutoLandInformation) => {
			return this.limit(async () => {
				const serviceInstance = this.serviceAutoland();
				await serviceInstance.getInformationByProvider(vehicle);
				await serviceInstance.saveMetadata();
				// await serviceInstance.processImagesExterior();
				// await serviceInstance.processImagesInterior();
				await serviceInstance.saveDataInDatabase();
				return serviceInstance;
				// return this.serviceAutoland.proccess(vehicle);
			});
		});
		await Promise.all(promiseVehiclesList);

		// await this.serviceAutoland.proccess( {
		// 	"id": 359590,
		// 	"nombre": "CX-9 2.5T AT PRIME",
		// 	"descrip": "CX-9 2.5T PRIME AT",
		// 	"kilometraje": "68929",
		// 	"tipo_caja": "Automatica",
		// 	"combustible": "GASOLINA",
		// 	"anio": "2021",
		// 	"modelo": "CX-9 2.5T AT PRIME",
		// 	"placa": "BRS336",
		// 	"precio_soles": "",
		// 	"precio_dolares": "26,400",
		// 	"categoria": "SUV",
		// 	"marca": "MAZDA",
		// 	"imagen": "https:\/\/autoland.com.pe\/wp-content\/uploads\/2025\/01\/CX-9-2.5T-AT-PRIME.jpg",
		// 	"url": "https:\/\/autoland.com.pe\/seminuevo\/cx-9-2-5t-at-prime\/"
		// },);
	}
}
