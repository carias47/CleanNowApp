import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  FactureServiceHeaderUser,
  QualifityEmployee,
} from '../interfaces/factureHeaderUser.interface';
import { FactureServiceDetail } from '../interfaces/factureServiceDetail.interface';
import { he } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class FacturesService {
  _baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  GetServiceHeaderUser(
    userId: number,
    state: string
  ): Observable<FactureServiceHeaderUser[]> {
    return this.http.get<FactureServiceHeaderUser[]>(
      `${this._baseUrl}/Services/GetServicesHeaderUser/${userId}/${state}`
    );
  }

  GetServicesDetail(headerId: number): Observable<FactureServiceDetail[]> {
    return this.http.get<FactureServiceDetail[]>(
      `${this._baseUrl}/Services/GetServicesDetail/${headerId}`
    );
  }
  GetDetailsEmployee(idServiceHeader: number) {
    return this.http.get(
      `${this._baseUrl}/Qualifications/GetDetails?IdServicesHeader=${idServiceHeader}`
    );
  }
  CalificarEmpleado(
    calificacion: QualifityEmployee
  ): Observable<QualifityEmployee> {
    const url = `${this._baseUrl}/Qualifications/CreateQualificationsEmployees`;
    return this.http.post<QualifityEmployee>(url, calificacion);
  }

  GetServicesPending(idServicesHeader) {
    return this.http.get(
      `${this._baseUrl}/Services/GetServicesPending/${idServicesHeader}`
    );
  }

  GetServicesDetailDate(id_header: number) {
    return this.http.get(
      `${this._baseUrl}/Services/GetServicesDetailDate/${id_header}`
    );
  }
}
