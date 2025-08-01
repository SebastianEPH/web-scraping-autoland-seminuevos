import axios, { AxiosInstance } from 'axios';
import { TIMEOUT } from '../common/enum';
import https from 'https';
import { READERS_RESPONSE } from '../common/constants';
import { ResponseProvider } from '../models/response.provider';
import { OthersMapper } from '../mapper/others.mapper';

interface ApiConnectorConfig {
	host: string;
	timeout: TIMEOUT;
}

export class ApiConnectorUtil {
	private axiosInstance: AxiosInstance;

	constructor(private readonly config: ApiConnectorConfig) {
		const agent: https.Agent = new https.Agent({ rejectUnauthorized: false });
		this.axiosInstance = axios.create({
			baseURL: this.config.host,
			timeout: +this.config.timeout,
			headers: READERS_RESPONSE,
			httpsAgent: agent,
		});
	}

	public async get<T>(path: string, headers: object = {}): Promise<ResponseProvider<T>> {
		try {
			const {
				data,
				status,
				headers: headerResponse,
				config,
				request,
			} = await this.axiosInstance.get(path, { headers });
			return {
				statusCode: OthersMapper.parseStatusCodeForAxios(status),
				body: data,
				config,
				headers: headerResponse,
				request,
			};
		} catch (error) {
			console.log('ApiConnectorUtil | GET | Error in call provider', JSON.stringify(error));
			return {
				statusCode: OthersMapper.parseStatusCodeForAxios(error.response?.status),
				body: error.response?.data,
				headers: error.response?.headers,
				// config: error.response?.config,
				// request: error.response?.request,
			} as any;
		}
	}

	public async getFile<T>(path: string, headers: object = {}): Promise<ResponseProvider<T>> {
		try {
			const {
				data,
				status,
				headers: headerResponse,
				config,
				request,
			} = await this.axiosInstance.get(path, {
				headers,
				responseType: 'arraybuffer',
			});
			return {
				statusCode: OthersMapper.parseStatusCodeForAxios(status),
				body: data,
				config,
				headers: headerResponse,
				request,
			};
		} catch (error) {
			console.log('ApiConnectorUtil | GET FILE | Error in call provider', JSON.stringify(error));
			return {
				statusCode: OthersMapper.parseStatusCodeForAxios(error.response?.status),
				// body: error.response?.data,
				// headers: error.response?.headers,
				// config: error.response?.config,
				request: error.response?.request,
			} as any;
		}
	}

	public async post<T>(path: string, payload: object, headers: object = {}): Promise<ResponseProvider<T>> {
		try {
			const {
				data,
				status,
				headers: headerResponse,
				config,
				request,
			} = await this.axiosInstance.post(path, payload, { headers });
			return {
				statusCode: OthersMapper.parseStatusCodeForAxios(status),
				body: data,
				config,
				headers: headerResponse,
				request,
			};
		} catch (error) {
			return {
				statusCode: OthersMapper.parseStatusCodeForAxios(error.response?.status),
				body: error.response?.data,
				headers: error.response?.headers,
				config: error.response?.config,
				request: error.response?.request,
			};
		}
	}

	get host(): string {
		return this.config.host;
	}

	get timeOut(): number {
		return this.config.timeout;
	}
}
