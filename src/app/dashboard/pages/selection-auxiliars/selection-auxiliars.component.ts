import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuxiliarsToService } from '../../interfaces/auxiliars.interface';
import { DataSharingService } from '../../services/data-sharing.service';
import { DetailsServicesService } from '../../services/details-services.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-selection-auxiliars',
  templateUrl: './selection-auxiliars.component.html',
  styleUrls: ['./selection-auxiliars.component.css'],
})
export class SelectionAuxiliarsComponent {
  auxiliares: AuxiliarsToService[] = [];
  selectedAuxiliar: AuxiliarsToService;
  selectedAuxiliares: any;
  loading: boolean = false;
  auxiliars: AuxiliarsToService[] = [];
  constructor(
    private productService: ProductService,
    private dataSharingService: DataSharingService,
    private detailService: DetailsServicesService
  ) { }

  ngOnInit() {
    this.dataSharingService.currentPage.next(2);
    this.loading = true;
    const departamento = sessionStorage.getItem('seleccionDepartamento');
    const ciudad = sessionStorage.getItem('seleccionCiudad');
    const depto = JSON.parse(departamento);
    const ciud = JSON.parse(ciudad);

    this.productService
      .employees(depto.id, ciud.id)
      .subscribe((auxiliarsResponse) => {
        this.auxiliares = auxiliarsResponse;
        console.log('auxiliars', depto.id, ciud.id);
        this.loading = false;
      });
  }

  mostrarInformacion(auxiliar: AuxiliarsToService) {
    this.selectedAuxiliar = auxiliar;
    this.detailService.idAuxiliar.next(this.selectedAuxiliar.employee.user.id);
  }
  auxSelected(aux: any) {
    if (this.auxiliars.includes(aux.employee.id)) {
      // Si el ID ya está en la lista, quitarlo (deseleccionar)
      this.auxiliars = this.auxiliars.filter((id) => id !== aux.employee.id);
    } else {
      // Si el ID no está en la lista, agregarlo (seleccionar)
      this.auxiliars.push(aux.employee.user.id);
    }

    this.detailService.employees.next(this.auxiliars);
    this.dataSharingService.enviarDetalleData(aux);
  }
}
