import { QueryResult } from 'mysql2';

export class DatabaseQueryResult {
	fieldCount: number;

	affectedRows: number;

	insertId: number;

	info: string;

	serverStatus: number;

	warningStatus: number;

	changedRows: number;

	constructor(params: QueryResult) {
		console.log('PARAMS: ', params);
		Object.assign(this, params);
	}
}

export interface DatabaseQueryError {
	code: string;
	errno: number;
	sql: string;
	sqlState: string;
	sqlMessage: string;
}

export interface RecordsTotal {
	total_records: number;
}
