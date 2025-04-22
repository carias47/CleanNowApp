import { Component, OnInit } from '@angular/core';
import { ProductService } from './dashboard/services/product.service';

import { Router, NavigationEnd } from '@angular/router';
import { AutenticationService } from './auth/services/autentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductService],
})
export class AppComponent {
  constructor(

    private authService: AutenticationService,
    private router: Router
  ) {
    this.authService.isUserAuthenticated();
  }

}
