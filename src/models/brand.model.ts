import { BrandDatabaseNative } from '../dao/impl/brands.dao.mysql';

export class BrandModel {
	public id?: number;
	public codeUnique: string;
	public name: string;
	public urlImg?: string;

	constructor(value: BrandDatabaseNative) {
		this.id = value?.id;
		this.codeUnique = value?.codeUnique;
		this.name = value?.name;
		this.urlImg = value?.urlImg;
	}
}
