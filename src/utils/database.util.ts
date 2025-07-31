import { FILTER_SORT } from '../common/database.enum';
import { queryCommons } from '../common/query.commons';
import { Column, POSITION } from '../common/enum';

export class DatabaseUtil {
	public static filterSortDate(tableName: string, sort: FILTER_SORT): string {
		if (sort) {
			let newTableName: string = '';
			if (tableName) {
				newTableName = `${tableName}.`;
			}
			if (FILTER_SORT.CREATE_ASC === sort) {
				return queryCommons.sort.create.asc(newTableName);
			}
			if (FILTER_SORT.CREATE_DESC === sort) {
				return queryCommons.sort.create.desc(newTableName);
			}
			if (FILTER_SORT.UPDATE_ASC === sort) {
				return queryCommons.sort.update.asc(newTableName);
			}
			if (FILTER_SORT.UPDATE_DESC === sort) {
				return queryCommons.sort.update.desc(newTableName);
			}
		}
		return '';
	}

	public static filterSortAlphabetical(
		tableName: string | null,
		sort: FILTER_SORT,
		sortColumn: string,
		filterSort: object,
	): string {
		if (sort) {
			let newTableName: string = '';
			if (tableName) {
				newTableName = `${tableName}.`;
			}
			const sortValue = filterSort[sortColumn?.toLowerCase().trim()];
			if (!sortValue) {
				return '';
			}
			if (FILTER_SORT.ALPHABETICAL_ASC === sort) {
				return queryCommons.sort.alphabetical.asc(newTableName, sortValue);
			}
			if (FILTER_SORT.ALPHABETICAL_DESC === sort) {
				return queryCommons.sort.alphabetical.desc(newTableName, sortValue);
			}
		}
		return '';
	}

	public static getFieldInformation(keyValuePairs: KeyValuePair[]): QueryFieldInformation {
		const queryUtil: QueryFieldInformation = {
			names: [],
			params: [],
			interrogation: [],
		};
		keyValuePairs
			.filter((keyValuePair: KeyValuePair) => keyValuePair[POSITION.SECOND])
			.forEach((keyValuePair: KeyValuePair): void => {
				queryUtil?.names.push(keyValuePair[POSITION.FIRST]);
				queryUtil?.interrogation.push('?');
				if (typeof keyValuePair[POSITION.SECOND] === 'string') {
					queryUtil?.params.push(keyValuePair[POSITION.SECOND]?.trim().toLocaleLowerCase());
					return;
				}
				if (typeof keyValuePair[POSITION.SECOND] === 'object') {
					queryUtil?.params.push(JSON.stringify(keyValuePair[POSITION.SECOND], null, 0));
					return;
				}
				queryUtil?.params.push(keyValuePair[POSITION.SECOND]);
			});
		console.log('queryUtil', queryUtil);
		return queryUtil;
	}
}

export interface QueryFieldInformation {
	names: string[];
	params: unknown[];
	interrogation: string[];
}

export interface KeyValuePair {
	0: Column;
	1: boolean | object | string | number | null;
}
