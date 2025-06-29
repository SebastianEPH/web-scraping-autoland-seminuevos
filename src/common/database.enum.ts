export enum BooleanDatabase {
    YES = 'true',
    NO = 'false',
}

export enum SQL {
    WHERE = 'WHERE',
    AND = 'AND',
}
export enum FILTER_SORT {
    CREATE_ASC = 'create_asc',
    CREATE_DESC = 'create_desc',
    UPDATE_ASC = 'update_asc',
    UPDATE_DESC = 'update_desc',
    ALPHABETICAL_ASC = 'abc_asc',
    ALPHABETICAL_DESC = 'abc_desc',
    POPULARITY = 'popularity',
    RELEVANCE = 'relevance',
}
export enum DatabaseCodeError {
    DUPLICATE = 'ER_DUP_ENTRY',
    TABLE_NAME = 'ER_NO_SUCH_TABLE',
    ECONNREFUSED= "ECONNREFUSED",
    WRONG_VALUE_COUNT_ON_ROW = 'WRONG_VALUE_COUNT_ON_ROW',
    NO_REFERENCED_ROW_2 = 'ER_NO_REFERENCED_ROW_2',
    SYNTAX = 'ER_SYNTAX_ERROR',
    ACCESS_DENIED = 'ER_ACCESS_DENIED_ERROR',
}
