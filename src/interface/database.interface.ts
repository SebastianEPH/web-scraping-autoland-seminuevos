import {Column} from "../common/enum";

export interface QueryFieldInformation {
    names: string[];
    params: unknown[];
    interrogation: string[];
}

export interface KeyValuePair {
    0: Column;
    1: boolean | object | string | number | null;
}
