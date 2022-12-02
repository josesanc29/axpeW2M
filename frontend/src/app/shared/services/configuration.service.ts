import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private http: HttpClient) {
    this.http.get(`${environment.apiUrl}/assets/configuration/config.json`).subscribe(config => this.config = config);
  }

  private config: any = null;

  get data(): any {
    return this.config;
  }

}
