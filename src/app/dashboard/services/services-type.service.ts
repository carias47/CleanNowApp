import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesTypeService {
  myAppUrl: string = environment.baseUrl;
  myApiUrl: string = '/Services/ServicesType';
  myApiPostUrl: string = '/Services/PostServicesType';

  constructor(private http: HttpClient) {}

  getServicesType(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  lst(parametro: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/${parametro}`);
  }

  enviarDatos(dt: any): Observable<any> {
    let Json = JSON.stringify(dt);

    return this.http.post(`${this.myAppUrl}${this.myApiPostUrl}`, Json);
  }
}
