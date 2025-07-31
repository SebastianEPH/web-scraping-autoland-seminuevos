import { inject, injectable, named } from 'inversify';
import { TYPES } from '../../type';
import { AutolandProvider } from '../../provider/autoland-provider';

import { AutolandSeminuevosService } from '../autoland-seminuevos.service';
import { AutolandSeminuevosModel } from '../../models/autoland-seminuevos.model';
import { AutolandUniqueInformation } from '../../interface/autoland-unique.information.interface';
import { FilesStorage } from '../../storage/files.storage';

@injectable()
export class AutolandSeminuevosServiceImpl implements AutolandSeminuevosService {
	constructor(
		@inject(TYPES.AutolandProvider) private autolandProvider: AutolandProvider,
		@inject(TYPES.Storage) private storage: FilesStorage,
	) {}

	public async proccess(autolandSeminuevos: AutolandSeminuevosModel): Promise<void> {
		const { name, urlImg, licencePlate } = autolandSeminuevos;

		await this.saveImagen(urlImg, name);
		this.storage.saveJson(name, autolandSeminuevos);
		const { body } = await this.autolandProvider.getInformation(licencePlate);
		await this.generateDataExterior(body, name);
		await this.generateDataInterior(body, name);
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
			await this.saveImagen(urlImg, urlImg.split('/').pop()?.split('.jpg')[0]);
		}
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
			await this.saveImagen(urlImg, urlImg.split('/').pop()?.split('.jpg')[0]);
		}
	}
	private async saveImagen(url: string, fileName: string): Promise<void> {
		console.log(`Save Imagen nombre: ${fileName}| url: '${url}'`);
		const { body } = await this.autolandProvider.getImagen(url);
		this.storage.saveFile(fileName, body);
	}
}
