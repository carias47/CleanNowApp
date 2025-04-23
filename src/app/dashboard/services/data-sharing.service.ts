import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  SelectedCategories,
  FechaSeleccionada,
} from '../interfaces/categories.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  _baseUrl = environment.baseUrl;
  detalleData = new Subject<any>();
  private employeeData = new Subject<any>();
  private date: string;

  // de la nueva pantalla selection-services
  selectedDataSubject = new BehaviorSubject<any>(null);
  selectedData$ = this.selectedDataSubject.asObservable();
  dataSetCategorySubject = new BehaviorSubject<SelectedCategories[]>(null);
  sendCharacteristicTable = new BehaviorSubject<any>(null);
  DateToDay = new BehaviorSubject<[]>(null);
  idCategorySubject = new BehaviorSubject<number>(null);
  currentPage = new BehaviorSubject<number>(null);
  fechas = new BehaviorSubject<FechaSeleccionada[]>(null);
  idCity = new BehaviorSubject<any>(null);
  pricePlan = new BehaviorSubject<number>(0);
  characteristics = new BehaviorSubject<any>(null);
  ordersDetail = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  enviarDetalleData(detalle: any) {
    this.detalleData.next(detalle);
  }

  obtenerDetalleData() {
    return this.detalleData.asObservable();
  }

  enviarDataEmployee(dataEmployee: any) {
    this.employeeData.next(dataEmployee);
  }

  obtenerDataEmployee() {
    return this.employeeData.asObservable();
  }

  setSelectedData(data: any) {
    this.selectedDataSubject.next(data);
  }

  setDataTable(dataReceived) {
    return this.sendCharacteristicTable.next(dataReceived);
  }

  setSubtotal(selectedCategories: SelectedCategories[]) {
    this.dataSetCategorySubject.next(selectedCategories);
  }

  getFestives(date: string) {
    return this.http.get(`${this._baseUrl}/Festives/GetDate/${date}`);
  }

  // serviceUrgente(): Observable<[]> {
  //   return this.http.get<[]>(`${this._baseUrl}/Services/ServicesAdd/4`);
  // }
}
