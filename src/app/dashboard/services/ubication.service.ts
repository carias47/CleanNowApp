import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CiudadIP,
  Ciudades,
  Departamentos,
} from '../interfaces/ubication-response.interface';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataResponse } from 'src/app/auth/interfaces/data-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UbicationService {
  _baseUrl = environment.baseUrl;
  dataResponse: DataResponse;

  public citySource = new BehaviorSubject<{
    departament: string;
    city: string;
  } | null>(null);
  currentCity = this.citySource.asObservable();
  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('token');
  }

  getData() {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const values = atob(payload);
      const valuesJson = JSON.parse(values);
      const userId = valuesJson.sid;
      const name = valuesJson.name;
      this.dataResponse = { userId, name };
      return this.dataResponse;
    }
  }
  getDepartaments(): Observable<Departamentos[]> {
    return this.http.get<Departamentos[]>(`${this._baseUrl}/States`);
  }

  getCiudadesByDepartamento(
    departamentoId: Departamentos
  ): Observable<Ciudades[]> {
    if (!departamentoId) return of([]);

    const url: string = `${this._baseUrl}/Cities/${departamentoId}`;

    return this.http.get<Ciudades[]>(url).pipe(tap((response) => response));
  }

  getUbication(city) {
    this.citySource.next(city);
  }
  getCitByIp() {
    return this.http.get<CiudadIP>(`${this._baseUrl}/Cities/GetIp`);
  }
}
