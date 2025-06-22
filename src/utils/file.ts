import path from 'path';
import fs from 'fs';

export class FileUtil {
	static cleanText(value: string) {
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

	static get directory(): string {
		return process.cwd();
	}
	static generateDirectoryName(folderNames: string[]): string {
		const result: string = path.join(
			FileUtil.directory,
			'DATA',
			...folderNames.map((folderName: string) => FileUtil.cleanText(folderName)),
		);
		if (!fs.existsSync(result)) {
			fs.mkdirSync(result, { recursive: true });
		}
		return result;
	}

	static saveFile(folderName: string[], fileName: string, content: string): void {
		const filenameClean: string = FileUtil.cleanText(fileName);
		const filePath: string = path.join(FileUtil.generateDirectoryName(folderName), `${filenameClean}.jpg`);
		fs.writeFileSync(filePath, content);
		console.log(`Imagen guardada en: ${filePath}`);
	}
	static saveJson(folderName: string[], fileName: string, object: any): void {
		const filenameClean: string = FileUtil.cleanText(fileName);
		const filePath: string = path.join(FileUtil.generateDirectoryName(folderName), `${filenameClean}.json`);
		const jsonContent = JSON.stringify(object, null, 2); // Formatea el JSON con espaciado
		fs.writeFileSync(filePath, jsonContent);
		console.log(`Archivo JSON guardado en: ${filePath}`);
	}
}
