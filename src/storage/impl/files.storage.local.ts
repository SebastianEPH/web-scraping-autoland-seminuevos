import { inject, injectable, named } from 'inversify';
import { FilesStorage } from '../files.storage';
import { TYPES } from '../../type';
import { TAG } from '../../tag';
import path from 'path';
import fs from 'fs';

@injectable()
export class FilesStorageLocalImpl implements FilesStorage {
	constructor(@inject(TYPES.StorageSubPath) @named(TAG.StorageLocal) private prefixPath: string[]) {}

	public saveJson(directoryNames: string[], fileNameAndExtension: string, object: object): string {
		const jsonContent: string = JSON.stringify(object, null, 2);
		return this.saveFile(directoryNames, fileNameAndExtension, jsonContent);
	}

	public saveFile(directoryNames: string[], fileNameAndExtension: string, content: string): string {
		const filenameClean: string = FilesStorageLocalImpl.cleanText(fileNameAndExtension);
		const filePath: string = path.join(this.generateDirectoryName(directoryNames), filenameClean);
		fs.writeFileSync(filePath, content);
		return filePath;
	}

	private static get directory(): string {
		return process.cwd();
	}
	private generateDirectoryName(directoryNames: string[]): string {
		const result: string = path.join(
			FilesStorageLocalImpl.directory,
			...FilesStorageLocalImpl.cleanTextArray(this.prefixPath),
			...FilesStorageLocalImpl.cleanTextArray(directoryNames),
		);
		if (!fs.existsSync(result)) {
			fs.mkdirSync(result, { recursive: true });
		}
		return result;
	}
	private static cleanTextArray(arrValues: string[]): string[] {
		return arrValues.map((value: string): string => FilesStorageLocalImpl.cleanText(value));
	}
	private static cleanText(value: string) {
		return `${value}`
			.replace(/[<>:"/\\|?*]+/g, '')
			.replace(/[\r\n\t]+/g, ' ')
			.replace(/\s+/g, ' ')
			.trim()
			.replace(/&#8211;/g, '-')
			.replace(/&[a-z]+;/g, '')
			.replace(/\\\//g, '-')
			.replace(/\//g, '-');
	}
}
