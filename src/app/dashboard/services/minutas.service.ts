import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MinutaServiceInterface } from '../interfaces/minuta.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ResultadoCalculo } from '../interfaces/resultadoCalculo.interface';

@Injectable({
  providedIn: 'root',
})
export class MinutasService {
  _baseUrl = environment.baseUrl;
  idCharactCity = new BehaviorSubject<number>(0);
  selectedIdCharact = this.idCharactCity.asObservable();

  constructor(private http: HttpClient) {}

  postSendMinutas(
    dataSendMinuta: MinutaServiceInterface
  ): Observable<MinutaServiceInterface> {
    const url = `${this._baseUrl}/Services/PostMinutaServices`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };
    return this.http.post<MinutaServiceInterface>(
      url,
      dataSendMinuta,
      httpOptions
    );
  }
  getCalculatePrice(datos: ResultadoCalculo): Observable<any> {
    const url = `${this._baseUrl}/Services/calculatePrices`;
    return this.http.post<ResultadoCalculo>(url, datos);
  }
  setSelectedId(id: number) {
    this.idCharactCity.next(id);
  }
}
