import { AutolandSeminuevosModel } from '../models/autoland-seminuevos.model';

export interface AutosRepository {
	create(request: AutolandSeminuevosModel): Promise<any>;
}
