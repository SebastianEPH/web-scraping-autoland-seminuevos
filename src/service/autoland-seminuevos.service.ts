import { VehiclesAutoLandInformation } from '../interface/autoland-provider.interface';

export interface AutolandSeminuevosService {
	getInformationByProvider(vehicle: VehiclesAutoLandInformation): Promise<void>;
	processImagesExterior(): Promise<void>;
	processImagesInterior(): Promise<void>;
	saveMetadata(): Promise<void>;
	saveDataInDatabase(): Promise<void>;
}
