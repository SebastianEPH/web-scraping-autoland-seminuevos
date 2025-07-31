import { Column, NUM, POSITION } from '../../common/enum';
import { SQL } from '../../common/database.enum';

export class QueryDatabaseUtil {
	public static AddAndCondition(condition: SQL, dbField: Column | string, value: string | number): string {
		if (value === undefined || !dbField) return '';
		return ` ${condition} ${dbField.trim()}='${value.toString().trim()}'`;
	}
	public static AddAndConditionQuestionMark(condition: SQL, dbField: Column | string, value: string | number): string {
		if (value === undefined || !dbField) return '';
		return ` ${condition} ${dbField.trim()}=${value.toString().trim()}`;
	}
	public static addQueryArray(dbField: string, value: string[], condition: SQL): string {
		if (value === undefined || !dbField) return '';
		return ` ${condition} ${dbField.trim()} IN (${this.parseArray(value)}) `;
	}
	public static Beautiful(query: string): string {
		return query.replace(/[\n\t]/g, ' ').trim();
	}
	public static parseArray(values: string[]): string {
		if (values.length === NUM.ONE) return `'${values[POSITION.FIRST]}'`;
		return values.map((value: string): string => `'${value?.trim()}'`).join(', ');
	}
	public static insert(nameTable: string, { names, interrogation, params }: QueryFieldInformation): queryInterface {
		const query: string = `INSERT INTO ${nameTable} (${names})
			VALUES (${interrogation}); `;
		const queryWithParams: string = `INSERT INTO ${nameTable} (${names})	VALUES (${params}); `;

		console.log(`QUERY           : `, query);
		console.log(`QUERY WITH DATA : `, queryWithParams);
		return {
			query,
			queryWithParams,
		};
	}
	public static delete(nameTable: string, { names, interrogation, params }: QueryFieldInformation): queryInterface {
		let condition: string[] = [];
		let conditionWithParams: string[] = [];
		names.forEach((name: string, index: number): void => {
			let type: SQL = index === POSITION.FIRST ? SQL.WHERE : SQL.AND;
			condition.push(QueryDatabaseUtil.AddAndConditionQuestionMark(type, name, interrogation[index]));
			conditionWithParams.push(QueryDatabaseUtil.AddAndCondition(type, name, `${params[index]}`));
		});
		const query: string = `DELETE FROM ${nameTable}${condition.join('')}; `;
		const queryWithParams: string = `DELETE FROM ${nameTable}${conditionWithParams.join('')}; `;

		console.log(`QUERY          : '${query}'`);
		console.log(`QUERY WITH DATA: '${queryWithParams}'`);
		return {
			query,
			queryWithParams,
		};
	}
}

export interface QueryFieldInformation {
	names: string[];
	params: unknown[];
	interrogation: string[];
}

export interface queryInterface {
	query: string;
	queryWithParams: string;
}
