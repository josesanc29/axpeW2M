import { PaginatedData } from 'src/app/shared/models/paginateddata.model';

export interface Superheroes extends  PaginatedData<any>{
    id: number;
    superhero?: string;
    publisher?: string;
    alter_ego?: string;
    first_appearance?: string;
    characters?: string;
    imagen?: string;
}
