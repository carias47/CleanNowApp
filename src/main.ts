/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (!navigator.geolocation) {
  alert('El navegador no soporta la Geolocalización.');
  throw new Error('El navegador no soporta la Geolocalización');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
