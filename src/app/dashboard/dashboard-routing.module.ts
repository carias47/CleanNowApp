import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileAssistantComponent } from './pages/profile-assistant/profile-assistant.component';
import { PagoExitosoComponent } from './components/pago-exitoso/pago-exitoso.component';
import { PortalUsuarioComponent } from './pages/portal-usuario/portal-usuario.component';
import { AuthGuard } from './guards/auth.guard';
import { IdValidationGuard } from './guards/id-validation.guard';
import { SelectionServicesComponent } from './pages/selection-services/selection-services.component';
import { SelectionAuxiliarsComponent } from './pages/selection-auxiliars/selection-auxiliars.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FacturaComponent } from './pages/factura/factura.component';

const routes: Routes = [
  {
    path: 'portal-usuario',
    component: PortalUsuarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: PaginationComponent,
    children: [
      {
        path: 'listado',
        component: SelectionServicesComponent,
      },
      {
        path: 'detalle/:id',
        component: ProfileAssistantComponent,
      },
      {
        path: 'proceso-pago/:id',
        component: PagoExitosoComponent,
        canActivate: [IdValidationGuard],
      },
      {
        path: 'selection-auxiliars',
        component: SelectionAuxiliarsComponent,
      },
      {
        path: 'confirmacion-pago',
        component: FacturaComponent,
      },
      {
        path: '**',
        redirectTo: 'listado',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'portal-usuario',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
