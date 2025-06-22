import { HTTP } from '../common/enum';

export class ResponseProvider<T> {
	statusCode: HTTP;

	body: T;

	headers?: object;

	config?: object;

	request?: object;
}
