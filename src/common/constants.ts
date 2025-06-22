import { HEADERS, PATHS, VALUE } from './enum';

export const READERS_RESPONSE = {
	[HEADERS.CONTENT_TYPE]: VALUE.APPLICATION_JSON,
};
export const ListCheckPK: string[] = [PATHS.TOKEN_CREATE, PATHS.TOKEN_YAPE_POST];
export const ListCheckSK: string[] = [PATHS.TOKEN_UPDATE, PATHS.TOKEN_GET, PATHS.TOKEN_LIST];
