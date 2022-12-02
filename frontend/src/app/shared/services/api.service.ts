import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class ApiService {

  private apiUrl: string = null; // Config.apiUrl;

  constructor(public http: HttpClient, public loadingService: LoadingService, private apiBaseUrl: string = null) {
    if (this.apiBaseUrl) { this.apiUrl = apiBaseUrl; }
  }

}
