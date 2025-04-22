import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsModule } from '../maps/maps.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ProfileAssistantComponent } from './pages/profile-assistant/profile-assistant.component';
import { LoaderComponent } from 'src/assets/loader/loader.component';
import { ModalUbicationComponent } from './components/modal-ubication/modal-ubication.component';
import { DetailServiceComponent } from './pages/detail-service/detail-service.component';
import { SeleccionPlanComponent } from './pages/seleccion-plan/seleccion-plan.component';
import { PagoExitosoComponent } from './components/pago-exitoso/pago-exitoso.component';
import { PortalUsuarioComponent } from './pages/portal-usuario/portal-usuario.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrdenesComponent } from './components/ordenes/ordenes.component';
import { PerfilUserComponent } from './components/perfil-user/perfil-user.component';
import { ModalFactureComponent } from './components/modal-facture/modal-facture.component';
import { SelectionServicesComponent } from './pages/selection-services/selection-services.component';
import { ResumenServicioComponent } from './components/resumen-servicio/resumen-servicio.component';
import { QualificationsComponent } from './components/qualifications/qualifications.component';
import { SelectionAuxiliarsComponent } from './pages/selection-auxiliars/selection-auxiliars.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DisponibilidadAuxiliarComponent } from './components/disponibilidad-auxiliar/disponibilidad-auxiliar.component';
import { TableServicesComponent } from './components/table-services/table-services.component';
import { FacturaComponent } from './pages/factura/factura.component';

@NgModule({
  declarations: [
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    StarRatingComponent,
    ProfileAssistantComponent,
    ModalUbicationComponent,
    DetailServiceComponent,
    SeleccionPlanComponent,
    PagoExitosoComponent,
    PortalUsuarioComponent,
    NavbarComponent,
    OrdenesComponent,
    PerfilUserComponent,
    ModalFactureComponent,
    SelectionServicesComponent,
    ResumenServicioComponent,
    TableServicesComponent,
    QualificationsComponent,
    SelectionAuxiliarsComponent,
    PaginationComponent,
    DisponibilidadAuxiliarComponent,
    FacturaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    MapsModule,
    NgxDaterangepickerMd.forRoot(),
  ],
})
export class DashboardModule { }
