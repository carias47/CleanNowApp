import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AutenticationComponent } from './pages/autentication/autentication.component';
import { RegisterComponent } from './pages/register/register.component';
import { RestablecerPasswordComponent } from './pages/restablecer-password/restablecer-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signin',
        component: AutenticationComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forgot-password',
        component: RestablecerPasswordComponent,
      },
      {
        path: '**',
        redirectTo: 'signin',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
