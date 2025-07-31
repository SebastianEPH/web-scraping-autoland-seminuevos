import { VehiclesAutoLandInformation } from '../interface/autoland-provider.interface';

export interface AutosRepository {
	create(informationVehicule: VehiclesAutoLandInformation): Promise<any>;
}
