import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceHeader } from '../interfaces/servicesHeader.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AllEmployees } from '../interfaces/employees.interface';
import { AuxiliarsToService } from '../interfaces/auxiliars.interface';

@Injectable({
  providedIn: 'root',
})
export class DetailsServicesService {
  _baseUrl = environment.baseUrl;
  public idServiceHeader = new BehaviorSubject<number>(null);
  public employees = new BehaviorSubject<any>([]);
  selectedId$ = this.idServiceHeader.asObservable();
  idAuxiliar = new BehaviorSubject<number>(null);

  constructor(private http: HttpClient) { }

  headerServices(dataHeader: ServiceHeader): Observable<ServiceHeader> {
    console.log(dataHeader);

    const url = `${this._baseUrl}/Services/PostServicesHeader`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post<ServiceHeader>(url, dataHeader, httpOptions);
  }

  detailService(dataDetail: any) {
    console.log('dataDetail', dataDetail);

    const url = `${this._baseUrl}/Services/PostServicesDetail`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post(url, dataDetail, httpOptions);
  }

  setSelectedId(id: number): void {
    this.idServiceHeader.next(id);
  }

  StatusOrdenComplete(id_orden: number) {
    const url = `${this._baseUrl}/Services/StatusOrden/${id_orden}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post(url, id_orden, httpOptions);
  }

  getLinkPay(id_orden: number) {
    console.log(id_orden);

    const url = `${this._baseUrl}/Events/GetLinkPay?idPayPlan=${id_orden}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };
    return this.http.get(url, httpOptions);
  }
  auxiliarsAvailables(
    date: any,
    hrStart: string,
    hrEnd: string,
    idServicesHeader: number
  ) {
    const formattedDate = this.convertirFormatoFecha(date);
    const url = `${this._baseUrl}/Services/CreateServicesDetailDate`;
    date = formattedDate;
    const data = {
      date,
      hrStart,
      hrEnd,
      idServicesHeader,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post(url, data, httpOptions);
  }
  convertirFormatoFecha(fecha: string): string {
    // Dividir la fecha en día, mes y año
    const partesFecha = fecha.split('-');

    // Crear un objeto Date con el formato YYYY-MM-DD
    const fechaConvertida = new Date(
      parseInt(partesFecha[2]),
      parseInt(partesFecha[1]) - 1,
      parseInt(partesFecha[0])
    );

    // Obtener la fecha en formato ISO y devolverla
    return fechaConvertida.toISOString().split('T')[0];
  }

  updateServicesHeader(id_factura: number) {
    console.log(id_factura);

    const url = `${this._baseUrl}/Services/ActualizarPrecioServicesHeader`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post(url, id_factura, httpOptions);
  }

  getAvailableEmployees(
    auxiliarId: number,
    formattedDate: string
  ): Observable<any> {
    const url = `${this._baseUrl}/Employees/Available/${auxiliarId}/${formattedDate}`;

    return this.http.get(url);
  }
}
