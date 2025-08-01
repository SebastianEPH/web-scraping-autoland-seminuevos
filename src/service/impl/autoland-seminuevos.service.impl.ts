import { inject, injectable } from 'inversify';
import { TYPES } from '../../type';
import { AutolandProvider } from '../../provider/autoland-provider';
import { AutolandSeminuevosService } from '../autoland-seminuevos.service';
import { AutolandSeminuevosModel } from '../../models/autoland-seminuevos.model';
import { AutolandUniqueInformation } from '../../interface/autoland-unique.information.interface';
import { FilesStorage } from '../../storage/files.storage';
import { VehiclesAutoLandInformation } from '../../interface/autoland-provider.interface';
import { HTTP } from '../../common/enum';

@injectable()
export class AutolandSeminuevosServiceImpl implements AutolandSeminuevosService {
	declare private autoLandSeminuevo: AutolandSeminuevosModel;

	constructor(
		@inject(TYPES.AutolandProvider) private autolandProvider: AutolandProvider,
		@inject(TYPES.Storage) private storage: FilesStorage,
	) {}

	public async proccess(vehicleInformation: VehiclesAutoLandInformation): Promise<void> {
		this.autoLandSeminuevo = new AutolandSeminuevosModel().fromWeb(vehicleInformation);

		const { body: vehicleProviderInformation } = await this.autolandProvider.getInformation(
			this.autoLandSeminuevo.licencePlate,
		);

		this.autoLandSeminuevo.image.information.s3PRefix = `https:${vehicleProviderInformation.cdn_image_prefix}`;

		await this.processImagesExterior(vehicleProviderInformation);
		await this.processImagesInterior(vehicleProviderInformation);

		const { body: imagenBuffer } = await this.autolandProvider.getImagen(this.autoLandSeminuevo.urlImg);
		this.storage.saveFile([this.autoLandSeminuevo.codeUnique], 'main.jpg', imagenBuffer);
		this.storage.saveJson([this.autoLandSeminuevo.codeUnique], 'information.json', this.autoLandSeminuevo);
	}

	private async processImagesExterior(information: AutolandUniqueInformation): Promise<void> {
		this.autoLandSeminuevo.image.information.exteriorLength = information?.info?.options?.numImgEC;

		const idS3: string = information.info.views?.exterior?.load_images_from;
		if (!idS3) {
			console.warn(
				`WARNING: No idS3 found in information 'exteriorLength': '${this.autoLandSeminuevo.image.information.exteriorLength}'`,
			);
			return;
		}
		for (let i: number = 0; i < this.autoLandSeminuevo.image.information.exteriorLength; i++) {
			const nameFile: string = `0-${i}.jpg`;
			const urlOriginal: string = `${this.autoLandSeminuevo.image.information.s3PRefix}${idS3}/${nameFile}`;
			const extension: string = nameFile.substring(nameFile.lastIndexOf('.'));

			const { statusCode, body: imagenBuffer } = await this.autolandProvider.getImagen(urlOriginal);
			if (statusCode !== HTTP.STATUS_CODE_200) {
				console.error(`ERROR: No se pudo obtener la imagen Exterior statusCode:'${statusCode}'`);
				continue;
			}
			this.autoLandSeminuevo.image.exterior.push({
				urlOriginal,
				urlSave: this.storage.saveFile([this.autoLandSeminuevo.codeUnique, 'exterior'], nameFile, imagenBuffer),
				extension,
				nameFile,
			});
		}
		console.log('Finish , exterior', JSON.stringify(this.autoLandSeminuevo, null, 2));
	}

	private async processImagesInterior(information: AutolandUniqueInformation): Promise<void> {
		this.autoLandSeminuevo.image.information.interiorLength = information.info.options.hotspots.length;

		for (let i: number = 0; i < this.autoLandSeminuevo.image.information.interiorLength; i++) {
			const nameFile: string = `cu-${i + 1}.jpg`;
			const urlOriginal: string = `${this.autoLandSeminuevo.image.information.s3PRefix}closeups/${nameFile}`;
			const extension: string = nameFile.substring(nameFile.lastIndexOf('.'));

			const { statusCode, body: imagenBuffer } = await this.autolandProvider.getImagen(urlOriginal);
			if (statusCode !== HTTP.STATUS_CODE_200) {
				console.error(`ERROR: No se pudo obtener la imagen Interior statusCode:'${statusCode}'`);
				continue;
			}
			this.autoLandSeminuevo.image.interior.push({
				urlOriginal,
				urlSave: this.storage.saveFile([this.autoLandSeminuevo.codeUnique, 'interior'], nameFile, imagenBuffer),
				extension,
				nameFile,
			});
			console.log('Finish , interior', JSON.stringify(this.autoLandSeminuevo, null, 2));
		}
	}
}
