import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AutenticationComponent } from './pages/autentication/autentication.component'
import { LoginComponent } from './pages/login/login.component'
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login'
import { RegisterComponent } from './pages/register/register.component'
import { RestablecerPasswordComponent } from './pages/restablecer-password/restablecer-password.component'

@NgModule({
  declarations: [LoginComponent, AutenticationComponent, RegisterComponent, RestablecerPasswordComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, GoogleSigninButtonModule],
  providers: [],
})
export class AuthModule {}
