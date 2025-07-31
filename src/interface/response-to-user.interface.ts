import { FILTER_SORT } from '../common/database.enum';

export interface Filters {
	page: number;
	limit: number;
	currentValues: number;
	totalValues: number;
	totalPages: number;
}
export interface Pagination {
	previous: boolean;
	next: boolean;
	page: number;
	pages: number[];
}

export class ToUser<T> {
	declare public data: T;
	declare private userMessage?: string;
	declare private devMessage?: string;
	declare private error: object;
	declare private dropdown: object | null;
	declare private pagination: Pagination | null;
	declare private filter: Filters;

	constructor() {
		this.filter = null;
		this.dropdown = null;
		this.pagination = null;
		this.data = null;
		this.userMessage = null;
		this.devMessage = null;
		this.error = null;
	}

	public setUserMessage(userMessage: string) {
		this.userMessage = userMessage;
	}

	public setDevMessage(devMessage: string) {
		this.devMessage = devMessage;
	}

	public setMessage(message: string): ToUser<T> {
		this.devMessage = message;
		this.userMessage = message;
		return this;
	}

	private calculatePagination(maxVisiblePages: number): void {
		const page: number = this.filter.page;
		const totalPages: number = this.filter.totalPages;

		let startPage: number = Math.max(1, page - Math.floor(maxVisiblePages / 2));
		let endPage: number = startPage + maxVisiblePages - 1;

		// Ajuste para cuando estamos cerca del final de las páginas totales
		if (endPage > totalPages) {
			endPage = totalPages;
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		// Generar el array de páginas visibles
		const pages: number[] = [];
		for (let i: number = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		// Determinar si hay páginas anteriores y siguientes
		const previous: boolean = page > 1;
		const next: boolean = page < totalPages;
		this.pagination = {
			previous,
			pages,
			page,
			next,
		};
	}

	public setFiltersAcceptDateCreate(): void {
		this.dropdown = {
			...this.dropdown,
			[FILTER_SORT.CREATE_ASC]: 'Fecha de creación Asc',
			[FILTER_SORT.CREATE_DESC]: 'Fecha de creación Desc',
		};
	}
	public setFiltersAcceptDateUpdate(): void {
		this.dropdown = {
			...this.dropdown,
			[FILTER_SORT.UPDATE_ASC]: 'Fecha de Actualización Asc',
			[FILTER_SORT.UPDATE_DESC]: 'Fecha de Actualización Desc',
		};
	}
	public setFiltersAcceptAlfabe(): void {
		this.dropdown = {
			...this.dropdown,
			[FILTER_SORT.ALPHABETICAL_ASC]: 'A a Z',
			[FILTER_SORT.ALPHABETICAL_DESC]: 'Z a A',
		};
	}

	public setError(error: object) {
		this.error = error;
	}

	public setData(data: T) {
		this.data = data;
	}

	public response(data: T): ToUser<T> {
		this.data = data;
		return this;
	}
}
