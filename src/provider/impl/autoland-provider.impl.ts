import { AutolandProvider } from '../autoland-provider';
import { inject, injectable, named } from 'inversify';
import { TYPES } from '../../type';
import { TAG } from '../../tag';
import { ApiConnectorUtil } from '../../utils/api-connector';
import { ResponseProvider } from '../../models/response.provider';
import { AutolandSeminuevosProviderResponse } from '../../interface/autoland-provider.interface';
import { AutolandUniqueInformation } from '../../interface/autoland-unique.information.interface';

@injectable()
export class AutolandProviderImpl implements AutolandProvider {
	constructor(@inject(TYPES.ApiConnectorUtil) @named(TAG.Autoland) private api: ApiConnectorUtil) {}

	public async listSeminuevos(): Promise<ResponseProvider<AutolandSeminuevosProviderResponse>> {
		const endpoint: string = `/api-seminuevos-data`;
		const headers: object = {};
		return await this.api.get(endpoint, headers);
	}
	public async getInformation(placa: string): Promise<ResponseProvider<AutolandUniqueInformation>> {
		const url: string = `https://api.impel.io/spin/autolandperu/${placa.toLowerCase()}`;
		return await this.api.get(url, {});
	}
	public async getImagen(url: string): Promise<ResponseProvider<string>> {
		const headers = {};
		return await this.api.getFile(url, headers);
	}
}
