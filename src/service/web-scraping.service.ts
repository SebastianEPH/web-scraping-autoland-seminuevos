import {VehiculosInformation} from "../interface/autoland-provider.interface";

export interface WebScrapingService {
	init(): Promise<void>;
	saveDatabaseOnlyTest(informationVehicule:VehiculosInformation): Promise<void>;
}
