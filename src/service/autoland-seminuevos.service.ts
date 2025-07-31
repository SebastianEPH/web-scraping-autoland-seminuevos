import { AutolandSeminuevosModel } from '../models/autoland-seminuevos.model';

export interface AutolandSeminuevosService {
	proccess(autolandSeminuevos: AutolandSeminuevosModel): Promise<void>;
}
