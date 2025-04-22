import { Component } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { AutenticationService } from '../../services/autentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private authService: SocialAuthService,
    private autenticationService: AutenticationService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.user) {
        this.signin(this.user);
      }
    });
  }

  private signin(user: SocialUser) {
    console.log(user);

    this.autenticationService.loginGoogle(user.idToken).subscribe(
      (response) => {
        localStorage.setItem('loggedUser', JSON.stringify(user));
      },
      (error) => {
        if (error) {
          // Asumiendo que el error 401.
          alert('Este correo no está permitido.');
        }
      }
    );
  }
}
