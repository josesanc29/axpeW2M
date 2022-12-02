import { FiltroHeroes } from '../interfaces/filtros-heroes.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HeroesBackendService } from './heroes-backend.service';
import { PaginatedData } from 'src/app/shared/models/paginateddata.model';



@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private backend: HeroesBackendService) { }

  get pageSize(): number {
    return 10;
  }

  set filter(filtro: FiltroHeroes) {
    this._currentFilter$.next({ ...this.currentFilter, ...filtro });
  }

  // tslint:disable-next-line:variable-name
  private _currentFilter$: BehaviorSubject<FiltroHeroes | null > | null = new BehaviorSubject<FiltroHeroes | null>({
    pagina: 1,
    numeroResultados: this.pageSize,
    id: null,
    imagen: null,
    superhero: null,
    publisher: null,
    alter_ego: null,
    first_appearance: null,
    characters: null,
  });

  public get currentFilter$(): Observable<FiltroHeroes> | null {
    return this._currentFilter$.asObservable();
  }

  public get currentFilter(): FiltroHeroes | null{
    return this._currentFilter$.value;
  }

  search(filtro: any = null): Observable<PaginatedData<any>> {
    return this.backend.search(!!filtro ? filtro : this.currentFilter);
  }

  // tslint:disable-next-line:typedef
  getListHeroes(): Observable<any>{
    return this.backend.getListHeroesData();
  }

  getHeroeId(id: number): Observable<any> {
    return this.backend.get(id);
  }

  create(data: FormData): Observable<any> {
    return this.backend.createData(data);
  }

  modify(data: FormData): Observable<any>{
    return this.backend.modifyData(data);
  }

  deleteHero(id: number): Observable<any>{
    return this.backend.deleteData(id);
  }

}
