import { ResponseProvider } from '../models/response.provider';
import { AutolandSeminuevosProviderResponse } from '../interface/autoland-provider.interface';
import { AutolandUniqueInformation } from '../interface/autoland-unique.information.interface';

export interface AutolandProvider {
	listSeminuevos(): Promise<ResponseProvider<AutolandSeminuevosProviderResponse>>;
	getInformation(url: string): Promise<ResponseProvider<AutolandUniqueInformation>>;
	getImagen(url: string): Promise<ResponseProvider<string>>;
}
