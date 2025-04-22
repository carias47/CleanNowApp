import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserData } from '../interfaces/employees.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  _baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUserData(id: number) {
    return this.http.get<UserData[]>(`${this._baseUrl}/Users/${id}`);
  }

  AddUsuarios(dt: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/Users/update`, dt);
  }
}
