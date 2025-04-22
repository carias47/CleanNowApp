import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

import {
  BehaviorSubject,
  EMPTY,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistroUsuario } from '../interfaces/register.interface';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/dashboard/services/data-sharing.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticationService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  _baseUrl = environment.baseUrl;
  totalValue: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {
    this.dataSharingService.pricePlan.subscribe((r) => (this.totalValue = r));
  }

  loginGoogle(token: string): Observable<boolean> {
    if (token) {
      const url = `${this._baseUrl}/Login/Google/${token}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text' as 'json',
      };

      if (this.totalValue > 0) {
        this.validarCompra();
        this.isAuthenticated.next(true);
        return this.http.post(url, token, httpOptions).pipe(
          tap((token: string) => {
            localStorage.setItem('token', token);
            const payload = token.split('.')[1];
            const values = atob(payload);
            const dataUser = JSON.parse(values);
            localStorage.setItem('userData', JSON.stringify(dataUser));
          }),
          map(() => true),
          catchError((err) => throwError(() => err.statusText))
        );
      } else {
        this.isAuthenticated.next(true);
        return this.http.post(url, token, httpOptions).pipe(
          tap((token: string) => {
            localStorage.setItem('token', token);
            const payload = token.split('.')[1];
            const values = atob(payload);
            const dataUser = JSON.parse(values);
            localStorage.setItem('userData', JSON.stringify(dataUser));
            this.router.navigate(['/dashboard']);
          }),
          map(() => true),
          catchError((err) => throwError(() => err.statusText))
        );
      }
    }
  }
  loginClient(userName: string, password: string) {
    const url = `${this._baseUrl}/Login/Client`;
    const body = { userName, password };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text' as 'json',
    };
    if (this.totalValue > 0) {
      this.validarCompra();
    } else {
      this.isAuthenticated.next(true);
      return this.http.post(url, body, httpOptions).pipe(
        tap((token: string) => {
          localStorage.setItem('token', token);
          const payload = token.split('.')[1];
          const values = atob(payload);
          const dataUser = JSON.parse(values);
          localStorage.setItem('userData', JSON.stringify(dataUser));
          localStorage.setItem('loggedUser', JSON.stringify(dataUser));
          this.router.navigate(['/dashboard']);
        }),
        map(() => true),
        catchError((err) => throwError(() => err.statusText))
      );
    }
  }

  validarCompra() {
    console.log('redireccionando...');
    window.location.href = 'https://checkout.wompi.co/l/test_jFiNBk';
  }
  logout() {
    this.clearAuthenticationData();
    this.isAuthenticated.next(false);
    this.router.navigate(['/dashboard']);
    setTimeout(() => {
      location.reload();
    }, 200);
  }

  private clearAuthenticationData() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('userData');
  }

  obtenerFechaExpiracion(): Date | null {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenData: any = jwtDecode(token);

      if (tokenData && tokenData.exp) {
        return new Date(tokenData.exp * 1000);
      }
    }
    return null;
  }

  isUserAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false; // No hay token, el usuario no está autenticado
    }
    const expirationDate = this.obtenerFechaExpiracion();
    const currentDate = new Date();
    if (expirationDate && currentDate < expirationDate) {
      console.log('El token no ha expirado');
      return true; // El token no ha expirado
    } else {
      this.clearAuthenticationData(); // Limpiar datos de autenticación si el token ha expirado
      console.log('El token ha expirado');
      return false; // El token ha expirado
    }
  }

  //el register es para el componente de autenticación
  register(datos: RegistroUsuario): Observable<RegistroUsuario> {
    if (datos) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text' as 'json',
      };

      const url = `${this._baseUrl}/Users/Register`;
      return this.http.post<RegistroUsuario>(url, datos, httpOptions);
    }
  }
  forgotPassword(email: string) {
    if (email) {
      const url = `${this._baseUrl}/Login/RecoverPassword/${email}`;

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text' as 'json',
      };
      return this.http.post(url, email, httpOptions);
    }
  }
}
