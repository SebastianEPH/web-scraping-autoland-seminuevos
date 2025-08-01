import { WebScrapingService } from '../web-scraping.service';
import promiseLimit from 'promise-limit';
import { inject, injectable, named } from 'inversify';
import { TYPES } from '../../type';
import { AutolandProvider } from '../../provider/autoland-provider';
import { VehiclesAutoLandInformation } from '../../interface/autoland-provider.interface';
import { AutosRepository } from '../../repository/autos.repository';
import { TAG } from '../../tag';
import { AutolandSeminuevosService } from '../autoland-seminuevos.service';

@injectable()
export class WebScrapingServiceImpl implements WebScrapingService {
	private readonly limit = promiseLimit(2);

	constructor(
		@inject(TYPES.AutolandProvider) private autoland: AutolandProvider,
		@inject(TYPES.Repository) @named(TAG.AUTO) private repositoryAutos: AutosRepository,
		@inject(TYPES.Service) @named(TAG.Autoland) private serviceAutoland: AutolandSeminuevosService,
	) {}

	async init(): Promise<void> {
		const {
			body: { data: vehiclesList },
		} = await this.autoland.listSeminuevos();

		const promiseVehiclesList: Promise<unknown>[] = vehiclesList.map((vehicle: VehiclesAutoLandInformation) => {
			return this.limit(() => {
				return this.serviceAutoland.proccess(vehicle);
			});
		});
		await Promise.all(promiseVehiclesList);
	}

	// private async process(information: VehiclesAutoLandInformation): Promise<void> {
	// 	const { nombre, imagen: urlImg, placa } = information;
	// 	await this.saveImagen([nombre], urlImg, nombre);
	// 	FileUtil.saveJson([nombre], nombre, information);
	//
	// 	const { body } = await this.autoland.getInformation(placa);
	// 	await this.generateDataExterior(body, nombre);
	// 	await this.generateDataInterior(body, nombre);
	// }

	async saveDatabaseOnlyTest(informationVehicule: VehiclesAutoLandInformation): Promise<void> {
		const responseDatabase = await this.repositoryAutos.create(informationVehicule);
		console.log('responseDatabase=>>> ', JSON.stringify(responseDatabase, null, 2));
		return responseDatabase;
	}
}
