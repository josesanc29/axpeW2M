import { FiltroBase } from 'src/app/shared/models/filtro-base.model';

export interface FiltroHeroes extends FiltroBase{
    textSearch?: string;
    id?: number;
    pagina?: number;
    numeroResultados?: number;
    superhero?: string;
    publisher?: string;
    alter_ego?: string;
    first_appearance?: string;
    characters?: string;
    imagen?: string;
}
