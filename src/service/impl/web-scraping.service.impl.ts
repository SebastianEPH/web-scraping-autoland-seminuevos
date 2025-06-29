import { WebScrapingService } from '../web-scraping.service';
import promiseLimit from 'promise-limit';
import {inject, injectable, named} from 'inversify';
import { TYPES } from '../../type';
import { AutolandProvider } from '../../provider/autoland-provider';
import { FileUtil } from '../../utils/file';
import { VehiculosInformation } from '../../interface/autoland-provider.interface';
import { AutolandUniqueInformation } from '../../interface/autoland-unique.information.interface';
import {AutosRepository} from "../../repository/autos.repository";
import {TAG} from "../../tag";

@injectable()
export class WebScrapingServiceImpl implements WebScrapingService {
	private readonly limit = promiseLimit(3);

	constructor(
		@inject(TYPES.AutolandProvider) private autoland: AutolandProvider,
		@inject(TYPES.Repository)  @named(TAG.AUTO) private repositoryAutos: AutosRepository,
		) {}

	async init(): Promise<void> {
		const { body } = await this.autoland.listSeminuevos();
		const promise: Promise<unknown>[] = body.data.map((vahiculo) => this.limit(() => this.process(vahiculo)));
		await Promise.all(promise);
	}

	async  saveDatabaseOnlyTest (informationVehicule:VehiculosInformation): Promise<void> {
		await this.repositoryAutos.create(informationVehicule)

	}

	private async process(information: VehiculosInformation): Promise<void> {
		const { nombre, imagen: urlImg, placa } = information;
		await this.saveImagen([nombre], urlImg, nombre);
		FileUtil.saveJson([nombre], nombre, information);

		const { body } = await this.autoland.getInformation(placa);
		await this.generateDataExterior(body, nombre);
		await this.generateDataInterior(body, nombre);
	}

	private async generateDataInterior(body: AutolandUniqueInformation, name: string): Promise<void> {
		const prefixS3 = `https:${body.cdn_image_prefix}`;
		const imgInterior: string[] = [];
		const cantidadDeImagenesInterior: number = body.info.options.hotspots.length;
		for (let i: number = 0; i < cantidadDeImagenesInterior; i++) {
			const urlImagen: string = `${prefixS3}closeups/cu-${i + 1}.jpg`;
			imgInterior.push(urlImagen);
		}

		for (const urlImg of imgInterior) {
			await this.saveImagen([`${name}`], urlImg, urlImg.split('/').pop()?.split('.jpg')[0]);
		}
	}

	private async generateDataExterior(body: AutolandUniqueInformation, name: string): Promise<void> {
		const cantidadDeImagenesExterior: number = body.info.options.numImgEC;
		const prefixS3 = `https:${body.cdn_image_prefix}`;

		const imgExterior: string[] = [];
		const idS3: string = body.info.views.exterior.load_images_from;
		for (let i: number = 0; i < cantidadDeImagenesExterior; i++) {
			const urlImagen: string = `${prefixS3}${idS3}/0-${i}.jpg`;
			imgExterior.push(urlImagen);
		}
		for (const urlImg of imgExterior) {
			await this.saveImagen([`${name}`], urlImg, urlImg.split('/').pop()?.split('.jpg')[0]);
		}
	}

	private async saveImagen(folderName: string[], url: string, fileName: string): Promise<void> {
		console.log(`Save Imagen nombre: ${fileName}| url: '${url}'`);
		const { body } = await this.autoland.getImagen(url);
		FileUtil.saveFile(folderName, fileName, body);
	}
}
