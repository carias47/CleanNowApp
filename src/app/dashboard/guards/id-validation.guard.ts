// id-validation.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FacturesService } from '../services/factures.service';

@Injectable({
  providedIn: 'root',
})
export class IdValidationGuard implements CanActivate {
  constructor(private router: Router, private detailFacture: FacturesService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    const id = route.params['id']; // Obtén el parámetro 'id' de la ruta

    if (token) {
      if (id) {
        this.detailFacture.GetServicesDetail(id).subscribe(
          (res) => {
            if (res.length === 0) {
              this.router.navigate(['/dashboard']);
            }
          },
          (error) => {
            if (error.status === 400) {
              this.router.navigate(['/dashboard']);
              return false;
            }
          }
        );
        return true; // Continúa con la navegación
      }
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
