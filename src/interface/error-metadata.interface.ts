import { ToUser } from './response-to-user.interface';
import {HTTP} from "../common/enum";

export interface ErrorMetadata {
	origin?: string;
	query?: string;
	queryWithParams?: string;
	paramsQuerySQL?: unknown[];
	param?: string;
	error?: Error;
}

export interface ExceptionInformation {
	response?: ToUser<object>;
	statusCode?: HTTP;
}
