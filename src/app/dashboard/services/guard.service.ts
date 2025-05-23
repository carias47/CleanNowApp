import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  constructor() {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('loggedUser');
  }
}
