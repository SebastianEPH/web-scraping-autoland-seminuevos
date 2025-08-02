import { inject, injectable, named } from 'inversify';
import { TYPES } from '../../type';
import { AutolandProvider } from '../../provider/autoland-provider';
import { AutolandSeminuevosService } from '../autoland-seminuevos.service';
import { AutolandSeminuevosModel, ImagenProperties } from '../../models/autoland-seminuevos.model';
import { AutolandUniqueInformation } from '../../interface/autoland-unique.information.interface';
import { FilesStorage } from '../../storage/files.storage';
import { VehiclesAutoLandInformation } from '../../interface/autoland-provider.interface';
import { HTTP } from '../../common/enum';

import { VehiclesRepository } from '../../repository/vehicles.repository';

@injectable()
export class AutolandSeminuevosServiceImpl implements AutolandSeminuevosService {
	declare private autoLandSeminuevo: AutolandSeminuevosModel;
	declare private subPathImagen: string;
	declare public codeUnique: string;
	private folderImagenInterior: string[] = ['interior'];
	private folderImagenExterior: string[] = ['exterior'];
	public vehicleProviderInformation: AutolandUniqueInformation;

	constructor(
		@inject(TYPES.Repository) private repositoryAutos: VehiclesRepository,
		@inject(TYPES.AutolandProvider) private autolandProvider: AutolandProvider,
		@inject(TYPES.Storage) private storage: FilesStorage,
	) {}

	private initConfig(vehicleInformation: VehiclesAutoLandInformation): void {
		this.autoLandSeminuevo = new AutolandSeminuevosModel().fromWeb(vehicleInformation);
		this.codeUnique = this.autoLandSeminuevo.codeUnique;
		console.log(`Empezando a trabajar con '${this.codeUnique}'`);
		this.folderImagenInterior.unshift(this.codeUnique);
		this.folderImagenExterior.unshift(this.codeUnique);
	}

	public async getInformationByProvider(vehicleInformation: VehiclesAutoLandInformation): Promise<void> {
		this.initConfig(vehicleInformation);
		const { statusCode, body: vehicleProviderInformation } = await this.autolandProvider.getInformation(
			this.autoLandSeminuevo.licencePlate,
		);
		if (statusCode !== HTTP.STATUS_CODE_200) {
			console.error(
				`ERROR: No se pudo obtener los valores de '${this.autoLandSeminuevo.licencePlate}', respondió un :'${statusCode}'`,
			);
		}

		this.generateS3UriToHttps(vehicleProviderInformation.s3_prefix, vehicleProviderInformation.info.options.version);
		this.vehicleProviderInformation = vehicleProviderInformation;
	}
	public async saveMetadata(): Promise<void> {
		if (!this.autoLandSeminuevo) {
			throw new Error('ERROR: No se ha inicializado el autoLandSeminuevo');
		}
		const { body: imagenBuffer } = await this.autolandProvider.getImagen(this.autoLandSeminuevo?.urlImg);
		this.storage.saveFile([this.codeUnique], 'main.jpg', imagenBuffer);
		this.storage.saveJson([this.codeUnique], 'information.json', this.autoLandSeminuevo);
	}

	public async processImagesExterior(): Promise<void> {
		const exteriorImagenLength: number = this.vehicleProviderInformation?.info?.options?.numImgEC;
		const idS3: string = this.vehicleProviderInformation.info.views?.exterior?.load_images_from;
		if (!idS3) {
			console.warn(`WARNING: No idS3 found in information: '${exteriorImagenLength}'`);
			return;
		}
		for (let i: number = 0; i < exteriorImagenLength; i++) {
			const nameFile: string = `0-${i}.jpg`;
			console.log(`[EXTERIOR] ${this.codeUnique}: ${String(i).padStart(2, ' ')}`, nameFile);
			const urlOriginal: string = `${this.subPathImagen}${idS3}/${nameFile}`;
			const extension: string = nameFile.substring(nameFile.lastIndexOf('.'));
			const { statusCode, body: imagenBuffer } = await this.autolandProvider.getImagen(urlOriginal);
			if (statusCode !== HTTP.STATUS_CODE_200) {
				console.error(`ERROR: No se pudo obtener la imagen Exterior statusCode:'${statusCode}'`);
				continue;
			}
			this.autoLandSeminuevo.image.exterior.push({
				urlOriginal,
				urlSave: this.storage.saveFile(this.folderImagenExterior, nameFile, imagenBuffer),
				extension,
				nameFile,
			});
		}
	}

	public async saveDataInDatabase(): Promise<void> {
		const responseDatabase = await this.repositoryAutos.saveDataVehicle(this.autoLandSeminuevo);
	}

	public async processImagesInterior(): Promise<void> {
		console.log(this.codeUnique, {
			numImgI: `${this.vehicleProviderInformation.info.options.numImgI}`,
			numImgCloseup: `${this.vehicleProviderInformation.info.options.numImgCloseup}`,
			hotspots: `${this.vehicleProviderInformation.info.options.hotspots.length}`,
		});
		if (
			!this.vehicleProviderInformation.info.options.numImgI ||
			!this.vehicleProviderInformation.info.options.numImgCloseup
		) {
			console.log(
				`${this.codeUnique} Entró interior ERROR  fuera interiorLength:'${this.vehicleProviderInformation.info.options}'`,
			);
		}
		if (this.vehicleProviderInformation.info.options.numImgI) {
			for (let i: number = 0; i < this.vehicleProviderInformation.info.options.numImgI; i++) {
				const result: ImagenProperties = await this.recorrerInterior(`0-${i}.jpg`, 'i', i);
				this.autoLandSeminuevo.image.interior.push(result);
			}
		}
		if (this.vehicleProviderInformation.info.options.numImgCloseup) {
			for (let i: number = 0; i < this.vehicleProviderInformation.info.options.numImgCloseup; i++) {
				const result: ImagenProperties = await this.recorrerInterior(`cu-${i}.jpg`, 'closeups', i);
				this.autoLandSeminuevo.image.interior.push(result);
			}
		}
	}

	private async recorrerInterior(nameFile: string, diferenciadorUrl: string, i: number): Promise<ImagenProperties> {
		console.log(
			`[INTERIOR] ${this.codeUnique}: ${String(i).padStart(2, ' ')}`,
			nameFile,
			`[diferenciadorUrl]: '${diferenciadorUrl}'`,
		);
		const urlOriginal = `${this.subPathImagen}${diferenciadorUrl}/${nameFile}`;

		const extension: string = nameFile.substring(nameFile.lastIndexOf('.'));

		const { statusCode, body: imagenBuffer } = await this.autolandProvider.getImagen(urlOriginal);
		if (statusCode !== HTTP.STATUS_CODE_200) {
			console.error(
				`${this.codeUnique} ERROR: ['${nameFile}'] No se pudo obtener la imagen Interior statusCode:'${statusCode}' '${urlOriginal}'`,
			);
			return;
		}
		return {
			urlOriginal,
			urlSave: this.storage.saveFile(this.folderImagenInterior, nameFile, imagenBuffer),
			extension,
			nameFile,
		};
	}

	private generateS3UriToHttps(s3Prefix: string, identifier: string): string {
		const s3Uri: string = `${s3Prefix}${identifier}/`;
		const regex = /^s3:\/\/([^\/]+)\/(.+)$/;
		const match = s3Uri.match(regex);
		if (!match) {
			throw new Error('Formato inválido de URI S3');
		}
		const [, bucket, path] = match;
		this.subPathImagen = `https://${bucket}.s3.amazonaws.com/${path}`;
		return this.subPathImagen;
	}
}
