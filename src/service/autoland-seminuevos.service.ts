import { VehiclesAutoLandInformation } from '../interface/autoland-provider.interface';

export interface AutolandSeminuevosService {
	proccess(vehicle: VehiclesAutoLandInformation): Promise<void>;
}
