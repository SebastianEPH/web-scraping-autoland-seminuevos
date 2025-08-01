export interface FilesStorage {
	saveJson(directoryNames: string[], fileName: string, object: object): string;
	saveFile(prefixPath: string[], fileName: string, content: string): string;
}
