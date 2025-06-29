import {HTTP} from "../common/enum";
import {ToUser} from "../interface/response-to-user.interface";
import {ErrorMetadata, ExceptionInformation} from "../interface/error-metadata.interface";


export class DatabaseException extends Error {
	public readonly statusCode: HTTP = HTTP.STATUS_CODE_500;

	public readonly metadata: ErrorMetadata = {};

	declare public readonly response: ToUser<object>;

	constructor({ statusCode, response }: ExceptionInformation) {
		super();
		this.statusCode = statusCode || this.statusCode;
		this.response = response || this.response;
	}
}
