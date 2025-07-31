import { VehiclesAutoLandInformation } from '../interface/autoland-provider.interface';

export interface WebScrapingService {
	init(): Promise<void>;
	saveDatabaseOnlyTest(informationVehicule: VehiclesAutoLandInformation): Promise<void>;
}
