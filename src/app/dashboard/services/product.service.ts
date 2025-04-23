import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AllCategories } from '../interfaces/categories.interface';
import { AllEmployees } from '../interfaces/employees.interface';
import { AuxiliarsToService } from '../interfaces/auxiliars.interface';

@Injectable()
export class ProductService {
  _baseUrl = environment.baseUrl;
  private _selectedServices: any[] = [];
  private _selectedAuxiliars: any[] = [];

  constructor(private http: HttpClient) { }

  getCategories(idPatern: number): Observable<AllCategories[]> {
    return this.http.get<AllCategories[]>(
      `${this._baseUrl}/Characteristic/GetCharacteristicByPatern?padre=${idPatern}`
    );
  }

  getLevels(level: number): Observable<AllCategories[]> {
    return this.http.get<AllCategories[]>(
      `${this._baseUrl}/Characteristic/GetCharacteristicLevel?level=${level}`
    );
  }

  getCharacteristicLevelCity(padreId: number, idCity: number) {
    return this.http.get<AllCategories[]>(
      `${this._baseUrl}/Characteristic/GetCharacteristicLevelCity?level=${padreId}&IdCity=${idCity}`
    );
  }

  employees(idDpto: number, idCiudad: number): Observable<AuxiliarsToService[]> {
    return this.http.get<AuxiliarsToService[]>(`${this._baseUrl}/Characteristic/State/${idDpto}/${idCiudad}`);
  }

  get selectedServices() {
    return this._selectedServices;
  }

  set selectedServices(services: any) {
    this._selectedServices = services;
  }

  get selectedAuxiliars() {
    return this._selectedAuxiliars;
  }

  set selectedAuxiliars(auxiliars) {
    this._selectedAuxiliars = auxiliars;
  }
}
