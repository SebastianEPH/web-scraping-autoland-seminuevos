import { AutolandSeminuevosModel } from '../models/autoland-seminuevos.model';

export interface VehiclesDao {
	create(request: AutolandSeminuevosModel): Promise<any>;
}
