import { FiltroHeroes } from '../interfaces/filtros-heroes.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Superheroes } from '../interfaces/superheroes.interface';
import { PaginatedData } from 'src/app/shared/models/paginateddata.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeroesBackendService {
  apiBase = environment.apiUrl;
  constructor(
    public loadingService: LoadingService,
    public translate: TranslateService,
    public http: HttpClient,
    public router: Router
  ) {}

  search(filtro: FiltroHeroes): Observable<PaginatedData<FiltroHeroes>> {
    const url = `/${this.apiBase}/superheroes`;
    const data = filtro ? filtro : {};

    return this.http.post(url, data).pipe(
      map((response: any) => {
        const r: PaginatedData<FiltroHeroes> = new PaginatedData<FiltroHeroes>(response);
        r.pageSize = filtro.numeroResultados;
        return r;
      }),
      catchError(error => {
        const r: PaginatedData<FiltroHeroes> = new PaginatedData<FiltroHeroes>();
        r.items = [];
        return of(r);
      })
    );
  }

  getListHeroesData(): Observable<any> {
    const url = `${this.apiBase}/superheroes`;
    return this.http.get(url).pipe(map((response: any) => {
      return response;
    }),
    catchError((error: HttpErrorResponse) => {
      return of(error);
    })
    );
  }

  get(id: number): Observable<Superheroes> {
    const url = `${this.apiBase}/superheroes/${id}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return of({
          ok: false,
          message: this.translate.instant('errores.noencontradodoc'),
          error: error.error
        });
      })
    );
  }

  createData(data: any): Observable<any> {
    const url = `${this.apiBase}/superheroes`;
    return this.http.post(url, data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return of({
          ok: false,
          message: this.translate.instant('errores.nocreadodoc'),
          data: error.error.datos
        });
      })
    );
  }

  modifyData(data: any): Observable<any> {
    const url = `${this.apiBase}/superheroes/${data.id}`;
    return this.http.put(url, data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return of({
          ok: false,
          message: this.translate.instant('errores.nocreadodoc'),
          data: error.error.datos
        });
      })
    );
  }

  deleteData(id: number): Observable<any> {
    const url = `${this.apiBase}/superheroes/${id}`;
    return this.http.delete(url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        return of({
          ok: false,
          message: error,
          data: error.error.datos
        });
      })
    );
  }

}
