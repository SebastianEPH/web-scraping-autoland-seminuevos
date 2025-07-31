import { VehiclesAutoLandInformation } from '../interface/autoland-provider.interface';
import {
	BooleanDatabase,
	CarBrand,
	CarType,
	EngineType,
	TransmissionType,
} from '../interface/database/vehicles-table.interface';

export class AutolandSeminuevosModel {
	public codeUnique: string;
	public name: string;
	public year: number;
	public modelYear?: number;
	public serialNumber: number;
	public licencePlate: string;
	public milage?: number;
	public description?: string;
	public isUsed: BooleanDatabase;
	public priceDollar: number;
	public url?: string;
	public urlImg?: string;
	public brand: CarBrand;
	public transmissionType: TransmissionType;
	public type: CarType;
	public engineType: EngineType;

	public fromWeb({
		placa,
		nombre,
		anio,
		descrip,
		kilometraje,
		imagen,
		tipo_caja,
		url,
		combustible,
		marca,
		categoria,
		precio_dolares,
	}: VehiclesAutoLandInformation): this {
		this.name = AutolandSeminuevosModel.cleanText(nombre);
		this.modelYear = parseInt(anio.trim());
		this.description = descrip.trim();
		this.licencePlate = placa.toUpperCase().trim();
		this.url = url.trim();
		this.urlImg = imagen.trim();
		this.milage = AutolandSeminuevosModel.cleanNumber(kilometraje);
		this.isUsed = BooleanDatabase.Yes;
		this.brand = AutolandSeminuevosModel.mapCarBrand(marca);
		this.priceDollar = AutolandSeminuevosModel.cleanNumber(precio_dolares);
		this.transmissionType = AutolandSeminuevosModel.mapTransmissionType(tipo_caja);
		this.type = AutolandSeminuevosModel.mapCarType(categoria);
		this.engineType = AutolandSeminuevosModel.mapEngineType(combustible);
		this.codeUnique = this.generateCodeUnique();
		return this;
	}

	private generateCodeUnique(): string {
		return AutolandSeminuevosModel.superCleanText(
			`${this.brand}-${this.name}-${this.modelYear}-${this.transmissionType}-${this.isUsed}-${this.milage}`.toUpperCase(),
		);
	}

	private static mapTransmissionType(value: string): TransmissionType {
		const values: Record<string, TransmissionType> = {
			'automatica': TransmissionType.AT,
			'mecanica': TransmissionType.MT,
		};
		const text: string = this.superCleanText(value).toLowerCase();
		const result: TransmissionType = values[text] || TransmissionType.Unknown;
		if (result === TransmissionType.Unknown) {
			console.log(`WARNING: No se logró identificar el tipo de TransmissionType, el valor es '${value}' => '${text}' `);
		}
		return result;
	}
	public static mapEngineType(value: string): EngineType {
		const maps: Record<string, EngineType> = {
			'hibrido': EngineType.Hybrid,
			'gasolina': EngineType.Gasoline,
			'gas(g.l.p.)': EngineType.GLP,
			'gas(g.n.v.)': EngineType.GNV,
			'diesel': EngineType.Diesel,
		};
		const text: string = this.superCleanText(value).toLowerCase();
		const result: EngineType = maps[text] || EngineType.Unknown;
		if (result === EngineType.Unknown) {
			console.log(`WARNING: No se logró identificar el tipo de EngineType, el valor es '${value}' => '${text}' `);
		}
		return result;
	}
	public static mapCarType(value: string): CarType {
		const maps: Record<string, CarType> = {
			'suv': CarType.Suv,
			'automovil': CarType.Commercial,
			'sedan': CarType.Sedan,
			'camioneta': CarType.Suv,
			'van': CarType.Van,
			'pickup': CarType.Pickup,
			'crossover': CarType.Crossover,
			'chassiscabinad': CarType.Truck,
			'acoplado': CarType.Truck,
			'hatchback': CarType.Hatchback,
			'coupe': CarType.Coupe,
			'convertible': CarType.Convertible,
			'minivan': CarType.Minivan,
			'truck': CarType.Truck,
			'wagon': CarType.Wagon,
			'sportscar': CarType.SportsCar,
			'electric': CarType.Electric,
			// 'hybrid': CarType.Hybrid,
			'luxury': CarType.Luxury,
			'compact': CarType.Compact,
			'midsize': CarType.MidSize,
			'fullsize': CarType.FullSize,
			'offroad': CarType.OffRoad,
		};
		const text: string = this.superCleanText(value).toLowerCase();
		const result: CarType = maps[text] || CarType.Unknown;
		if (result === CarType.Unknown) {
			console.log(`WARNING: No se logró identificar el tipo de CarType, el valor es '${value}' => '${text}' `);
		}
		return result;
	}
	public static mapCarBrand(value: string): CarBrand {
		const maps: Record<string, CarBrand> = {
			'suzuki': CarBrand.Suzuki,
			'nissan': CarBrand.Nissan,
			'chevrolet': CarBrand.Chevrolet,
			'mazda': CarBrand.Mazda,
			'hyundai': CarBrand.Hyundai,
			'honda': CarBrand.Honda,
			'kia': CarBrand.Kia,
			'changan': CarBrand.Changan,
			'toyota': CarBrand.Toyota,
			'ford': CarBrand.Ford,
			'maxus': CarBrand.Maxus,
			'geely': CarBrand.Geely,
			'chery': CarBrand.Chery,
			'renault': CarBrand.Renault,
			'mg': CarBrand.Mg,
			'mitsubishi': CarBrand.Mitsubishi,
			'citroen': CarBrand.Citroen,
			'subaru': CarBrand.Subaru,
			'volkswagen': CarBrand.Volkswagen,
			'jeep': CarBrand.Jeep,
			'peugeot': CarBrand.Peugeot,
			'jac': CarBrand.Jac,
			'jinbei': CarBrand.Jinbei,
			'volvo': CarBrand.Volvo,
			'audi': CarBrand.Audi,
			'haval': CarBrand.Haval,
			'gwm': CarBrand.Gwm,
			'seat': CarBrand.Seat,
			'bmw': CarBrand.Bmw,
			'mercedesbenz': CarBrand.MercedesBenz,
			'tesla': CarBrand.Tesla,
			'lexus': CarBrand.Lexus,
			'porsche': CarBrand.Porsche,
			'landrover': CarBrand.LandRover,
			'jaguar': CarBrand.Jaguar,
			'fiat': CarBrand.Fiat,
			'dodge': CarBrand.Dodge,
			'ram': CarBrand.Ram,
			'cadillac': CarBrand.Cadillac,
			'buick': CarBrand.Buick,
			'gmc': CarBrand.Gmc,
			'mini': CarBrand.Mini,
			'smart': CarBrand.Smart,
			'ferrari': CarBrand.Ferrari,
			'lamborghini': CarBrand.Lamborghini,
			'maserati': CarBrand.Maserati,
			'bentley': CarBrand.Bentley,
			'rollsroyce': CarBrand.RollsRoyce,
			'greatwall': CarBrand.GreatWall,
			'byd': CarBrand.BYD,
			'polestar': CarBrand.Polestar,
			'rivian': CarBrand.Rivian,
			'lucid': CarBrand.Lucid,
			// Marcas adicionales sugeridas (por si las necesitas)
			'lada': CarBrand.Lada,
			'tata': CarBrand.Tata,
			'ssangyong': CarBrand.SsangYong,
			'mahindra': CarBrand.Mahindra,
		};
		const text: string = this.superCleanText(value).toLowerCase();
		const result: CarBrand = maps[text] || CarBrand.Unknown;
		if (result === CarBrand.Unknown) {
			console.log(`WARNING: No se logró identificar el tipo de CarBrand, el valor es '${value}' => '${text}' `);
		}
		return result;
	}
	private static superCleanText(text: string): string {
		return text
			.trim()
			.normalize('NFD') // Separa letras y tildes (ej: "á" → "a´")
			.replace(/[\u0300-\u036f,]/g, '') // Elimina tildes y comas
			.replace(/\s+/g, ''); // espacios
	}
	private static cleanText(text: string): string {
		return text
			.trim()
			.normalize('NFD') // Separa letras y tildes (ej: "á" → "a´")
			.replace(/&#\d+;/g, ' ') // Elimina códigos HTML (ej: &#8211;)
			.replace(/[^\w\s.-]/g, '') // Elimina todo excepto letras, números, espacios, puntos y guiones
			.replace(/\s+/g, ' '); // Reduce múltiples espacios a uno solo
	}
	private static cleanNumber(text: string): number {
		return parseInt(text.trim().replace(/,/g, ''));
	}
}
