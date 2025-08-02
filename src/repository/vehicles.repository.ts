import { AutolandSeminuevosModel } from '../models/autoland-seminuevos.model';

export interface VehiclesRepository {
	saveDataVehicle(request: AutolandSeminuevosModel): Promise<any>;
}
