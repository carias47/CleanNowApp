import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import {
  CiudadIP,
  UbicationResponse,
} from '../../interfaces/ubication-response.interface';
import { UbicationService } from '../../services/ubication.service';
import { ToastrService } from 'ngx-toastr';
import { AutenticationService } from 'src/app/auth/services/autentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user!: SocialUser;
  ciudadIp: CiudadIP;
  dataResponse: UbicationResponse;
  ciudadSelected: string;

  constructor(
    private ubicationService: UbicationService,
    private toastr: ToastrService,
    private authServiceGoogle: SocialAuthService,
    private authService: AutenticationService
  ) { }

  ngOnInit() {

    let storedUser = localStorage.getItem('loggedUser');

    this.user = storedUser ? JSON.parse(storedUser) : null;
    if (this.user == null) {
      this.toastr.info('', 'Identifícate', { timeOut: 3000 });
    }
  }
  handleCitySelected(city) {
    this.ciudadSelected = city.city.name;
  }
  logout() {
    this.authServiceGoogle.signOut();
    this.authService.logout();
    sessionStorage.clear();
  }
}
