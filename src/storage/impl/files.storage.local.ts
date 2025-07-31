import { inject, injectable, named } from 'inversify';
import { FilesStorage } from '../files.storage';
import { TYPES } from '../../type';
import { TAG } from '../../tag';
import path from 'path';
import fs from 'fs';

@injectable()
export class FilesStorageLocalImpl implements FilesStorage {
	constructor(@inject(TYPES.Storage) @named(TAG.StorageLocal) private folderName: string[]) {}

	public saveJson(fileName: string, object: object): void {
		const filenameClean: string = FilesStorageLocalImpl.cleanText(fileName);
		const filePath: string = path.join(
			FilesStorageLocalImpl.generateDirectoryName(this.folderName),
			`${filenameClean}.json`,
		);
		const jsonContent = JSON.stringify(object, null, 2); // Formatea el JSON con espaciado
		fs.writeFileSync(filePath, jsonContent);
		console.log(`Archivo JSON guardado en: ${filePath}`);
	}

	public saveFile(fileName: string, content: string): void {
		const filenameClean: string = FilesStorageLocalImpl.cleanText(fileName);
		const filePath: string = path.join(
			FilesStorageLocalImpl.generateDirectoryName(this.folderName),
			`${filenameClean}.jpg`,
		);
		fs.writeFileSync(filePath, content);
		console.log(`Imagen guardada en: ${filePath}`);
	}

	private static get directory(): string {
		return process.cwd();
	}
	private static generateDirectoryName(folderNames: string[]): string {
		const result: string = path.join(
			FilesStorageLocalImpl.directory,
			'DATA',
			...folderNames.map((folderName: string) => FilesStorageLocalImpl.cleanText(folderName)),
		);
		if (!fs.existsSync(result)) {
			fs.mkdirSync(result, { recursive: true });
		}
		return result;
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
