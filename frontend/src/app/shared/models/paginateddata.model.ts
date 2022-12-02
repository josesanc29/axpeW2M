export class PaginatedData<T>{
    page: number; // página actual
    totalPages: number; // número total de páginas
    items: Array<T>; // elementos de la página actual
    totalItems?: number; // número total de elementos
    pageSize?: number; // tamaño de la página
    constructor(fromServer?: any) {
        // if (!fromServer) { return; }
        this.page = fromServer?.datos?.numPagina ?? 0;
        this.totalPages = fromServer?.datos?.numPaginasTotal ?? 0;
        this.items = fromServer?.datos?.listado ?? [];
        this.totalItems = fromServer?.datos?.numResultadosTotal ?? 0;
    }
}
