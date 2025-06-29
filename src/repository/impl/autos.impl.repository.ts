import {AutosRepository} from "../autos.repository";
import { Pool } from 'mysql2/promise';
import {inject, injectable} from "inversify";
import {TYPES} from "../../type";
import {Column} from "../../common/enum";
import {KeyValuePair, QueryFieldInformation} from "../../interface/database.interface";
import {DatabaseCreate} from "../../decorator/database.decorator";

@injectable()
export class AutosImplRepository implements AutosRepository {
    public static readonly TABLE_NAME: string = 'autos';

    private readonly tableName: string = AutosImplRepository.TABLE_NAME;

    constructor(
        @inject(TYPES.DatabaseClient)
        public database: Pool,
    ) {}

    @DatabaseCreate
    async create<T>(request: any): Promise<T>{
        const keyValue: KeyValuePair[] = [
            [Column.name, request?.name],
        ];
        return  keyValue as T
    }
}
