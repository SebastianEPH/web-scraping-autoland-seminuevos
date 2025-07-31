export interface FilesStorage {
	saveJson(fileName: string, object: object): void;
	saveFile(fileName: string, content: string): void;
}
