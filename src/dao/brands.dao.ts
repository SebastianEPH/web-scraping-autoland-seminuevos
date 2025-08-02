import { BrandDatabaseNative } from './impl/brands.dao.mysql';

export interface BrandsDao {
	getAllById(id: string): Promise<any>;
	getAllByName(id: string): Promise<any>;
	create(request: BrandDatabaseNative): Promise<number>;
}
