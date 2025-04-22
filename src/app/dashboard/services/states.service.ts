import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  myAppUrl: string = environment.baseUrl;
  myApiUrl: string = '/States?countryId=1';
  myApiCitiUrl: string = '/Cities/GetCity';

  constructor(private http: HttpClient) {}

  getStates(): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getCities(parametro: number): Observable<any> {
    return this.http.get(`${this.myAppUrl}${this.myApiCitiUrl}/${parametro}`);
  }

 
}
