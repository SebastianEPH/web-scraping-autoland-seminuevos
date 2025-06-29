import {VehiculosInformation} from "../interface/autoland-provider.interface";

export interface AutosRepository {
    create(informationVehicule:VehiculosInformation): Promise<any>;
}
