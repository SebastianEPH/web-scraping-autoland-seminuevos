export interface AutolandSeminuevosProviderResponse {
	data: VehiculosInformation[];
	filter: Filter;
}

export interface VehiculosInformation {
	id: number;
	nombre: string;
	descrip: string;
	kilometraje: string;
	tipo_caja: string;
	combustible: string;
	anio: string;
	modelo: string;
	placa: string;
	precio_soles: string;
	precio_dolares: string;
	categoria: string;
	marca: string;
	imagen: string;
	url: string;
}

export interface Filter {
	tipo: Tipo[];
	caja: Caja[];
	combustible: Combustible[];
	marca: string[];
	modelo: string[];
	anio: string[];
	kilometraje: string[];
	precio: string[];
	transmision: any[];
}

export interface Tipo {
	value: string;
	count: number;
}

export interface Caja {
	value: string;
	count: number;
}

export interface Combustible {
	value: string;
	count: number;
}
