import { Column } from './enum';

export const queryCommons = {
	page: (page: string | number, limit: string | number): string =>
		` OFFSET ${Number(page) * Number(limit) - Number(limit)}`,
	limit: (limit: string | number): string => ` LIMIT ${limit}`,
	sort: {
		create: {
			asc: (nameTable: string): string => ` ORDER BY ${nameTable}${Column.record_create_date} ASC`,
			desc: (nameTable: string): string => ` ORDER BY ${nameTable}${Column.record_create_date} DESC`,
		},
		update: {
			asc: (nameTable: string): string => ` ORDER BY ${nameTable}${Column.record_update_date} ASC`,
			desc: (nameTable: string): string => ` ORDER BY ${nameTable}${Column.record_update_date} DESC`,
		},
		popularity: {
			asc: ` `,
			desc: ` `,
		},
		relevance: {
			asc: ` `,
			desc: ` `,
		},
		alphabetical: {
			asc: (nameTable: string, column: Column): string => ` ORDER BY ${nameTable}${column} ASC`,
			desc: (nameTable: string, column: Column): string => ` ORDER BY ${nameTable}${column} DESC`,
		},
	},
};
