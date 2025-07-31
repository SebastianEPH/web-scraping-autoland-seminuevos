export enum EngineType {
	Gasoline = 'Gasoline',
	Diesel = 'Diesel',
	Hybrid = 'Hybrid',
	Electric = 'Electric',
	GNV = 'GNV',
	GLP = 'GLP',
	BiFuel = 'Bi-Fuel',
	Unknown = 'Unknown',
}

export enum TransmissionType {
	MT = 'MT',
	AT = 'AT',
	Unknown = 'Unknown',
	// CVT = 'CVT',
	// DCT = 'DCT',
	// AMT = 'AMT',
	// eCVT = 'eCVT',
	// EV = 'EV',
}

export enum BooleanDatabase {
	Yes = 'Yes',
	No = 'No',
}
export enum CarType {
	Suv = 'Suv',
	Sedan = 'Sedan',
	Pickup = 'Pickup',
	Hatchback = 'Hatchback',
	Coupe = 'Coupe',
	Convertible = 'Convertible',
	Minivan = 'Minivan',
	Van = 'Van',
	Truck = 'Truck',
	Crossover = 'Crossover',
	Wagon = 'Wagon',
	SportsCar = 'SportsCar',
	Electric = 'Electric',
	Luxury = 'Luxury',
	Compact = 'Compact',
	MidSize = 'MidSize',
	FullSize = 'FullSize',
	OffRoad = 'OffRoad',
	Commercial = 'Commercial',
	Unknown = 'Unknown',
}

export enum CarBrand {
	Suzuki = 'Suzuki',
	Nissan = 'Nissan',
	Chevrolet = 'Chevrolet',
	Mazda = 'Mazda',
	Hyundai = 'Hyundai',
	Honda = 'Honda',
	Kia = 'Kia',
	Changan = 'Changan',
	Toyota = 'Toyota',
	Ford = 'Ford',
	Maxus = 'Maxus',
	Geely = 'Geely',
	Chery = 'Chery',
	Renault = 'Renault',
	Mg = 'MG',
	Mitsubishi = 'Mitsubishi',
	Citroen = 'Citroen',
	Subaru = 'Subaru',
	Volkswagen = 'Volkswagen',
	Jeep = 'Jeep',
	Peugeot = 'Peugeot',
	Jac = 'JAC',
	Jinbei = 'Jinbei',
	Volvo = 'Volvo',
	Audi = 'Audi',
	Haval = 'Haval',
	Gwm = 'GWM',
	Seat = 'SEAT',
	Bmw = 'BMW',
	MercedesBenz = 'MercedesBenz',
	Tesla = 'Tesla',
	Lexus = 'Lexus',
	Porsche = 'Porsche',
	LandRover = 'LandRover',
	Jaguar = 'Jaguar',
	Fiat = 'Fiat',
	Dodge = 'Dodge',
	Ram = 'RAM',
	Cadillac = 'Cadillac',
	Buick = 'Buick',
	Gmc = 'GMC',
	Mini = 'Mini',
	Smart = 'Smart',
	Ferrari = 'Ferrari',
	Lamborghini = 'Lamborghini',
	Maserati = 'Maserati',
	Bentley = 'Bentley',
	RollsRoyce = 'RollsRoyce',
	// Marcas chinas/europeas menos comunes:
	GreatWall = 'GreatWall',
	BYD = 'BYD',
	Polestar = 'Polestar',
	Rivian = 'Rivian',
	Lucid = 'Lucid',
	SsangYong = 'SsangYong',
	Lada = 'Lada',
	Tata = 'Tata',
	Mahindra = 'Mahindra',
	Unknown = 'Unknown',
}
// Interfaz principal
export interface VehiclesTable {
	id: number;
	code_unique: string;
	name: string;
	year?: number | null;
	model_year: number;
	serial_number?: number | null;
	licence_plate?: string | null;
	milage?: number | null;
	description?: string | null;
	isUsed: BooleanDatabase;
	price_dol: number;
	url?: string | null;
	transmission_type: TransmissionType;
	engine_type: EngineType;
}
