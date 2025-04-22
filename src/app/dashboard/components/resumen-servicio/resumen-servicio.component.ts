import { Component, Input } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import {
  SelectedCategories,
  ServiceUrgent,
  FechaSeleccionada,
} from '../../interfaces/categories.interface';
import { AllEmployees } from '../../interfaces/employees.interface';
import { Plans } from '../../interfaces/plan.interface';

@Component({
  selector: 'app-resumen-servicio',
  templateUrl: './resumen-servicio.component.html',
  styleUrls: ['./resumen-servicio.component.css'],
})
export class ResumenServicioComponent {
  datosSeleccionados: any;
  selectedCategories: SelectedCategories[];
  subtotal: number = 0;
  total: number = 0;
  dateToService: FechaSeleccionada[] = [];
  auxiliaresSeleccionados: AllEmployees[] = [];
  servicioUrgente: ServiceUrgent;
  valorPrueba: any;
  planSelected: Plans;

  constructor(private dataService: DataSharingService) {}

  ngOnInit() {
    this.dataService.detalleData.subscribe((auxiliarsResponse) =>
      this.auxiliaresSeleccionados.includes(auxiliarsResponse)
        ? (this.auxiliaresSeleccionados = this.auxiliaresSeleccionados.filter(
            (aux) => aux !== auxiliarsResponse
          ))
        : this.auxiliaresSeleccionados.push(auxiliarsResponse)
    );
    this.dataService.selectedData$.subscribe((data) => {
      const departamento = sessionStorage.getItem('seleccionDepartamento');
      const ciudad = sessionStorage.getItem('seleccionCiudad');

      const parsedDataDepartament = JSON.parse(departamento);
      const parsedDataCiudad = JSON.parse(ciudad);

      this.datosSeleccionados = {
        categoria: data?.categoria,
        destino: {
          departamento: parsedDataDepartament?.name,
          ciudad: parsedDataCiudad?.name,
        },
      };
    });
    this.getSelectedCategory();
    this.getDateSelected();
    const serviceUrgent = sessionStorage.getItem('serviceUrgent');
    this.servicioUrgente = JSON.parse(serviceUrgent);
  }

  getSelectedCategory() {
    this.dataService.dataSetCategorySubject.subscribe((selectedCategories) => {
      const planSelectStorage = sessionStorage.getItem('planSelected');
      this.planSelected = JSON.parse(planSelectStorage);
      if (selectedCategories) {
        this.selectedCategories = selectedCategories;
        if (selectedCategories) {
          this.valorPrueba = selectedCategories;
          this.subtotal = selectedCategories?.reduce(
            (sum, item) => sum + (item.active ? item.price : 9000 + 0),
            0
          );
        }
      }
    });
  }
  calcularTotal(): number {
    const subtotal = this.subtotal;
    const servicioUrgentePrice = this.servicioUrgente
      ? this.servicioUrgente.price || 0
      : 0;

    const totalSinAuxiliares = subtotal + servicioUrgentePrice;

    this.total =
      this.auxiliaresSeleccionados.length > 0
        ? totalSinAuxiliares * this.auxiliaresSeleccionados.length
        : totalSinAuxiliares;
    let pricePlan;
    this.dataService.pricePlan.subscribe((r) => (pricePlan = r));

    let precioFinal = 0;

    if (isNaN(pricePlan) || pricePlan === 0) {
      precioFinal = this.total;
    } else {
      precioFinal =
        pricePlan +
        servicioUrgentePrice +
        this.valorPrueba?.reduce(
          (sum, item) => sum + (item.active ? 0 : 9000 + 0),
          0
        );
    }

    sessionStorage.setItem('totalValue', this.total.toString());

    return precioFinal;
  }
  getDateSelected() {
    this.dataService.fechas.subscribe((dateSelected) => {
      this.dateToService = dateSelected;
    });
    const fechas = sessionStorage.getItem('fechas');
    const fechasParsed = JSON.parse(fechas);
    this.dateToService = fechasParsed;
    this.dataService.DateToDay.subscribe((dateTodayResponse) => {
      if (dateTodayResponse == null) {
        this.servicioUrgente = null;
      }
      dateTodayResponse?.map((serviceUrgentResponse) => {
        this.servicioUrgente = serviceUrgentResponse;
        sessionStorage.setItem(
          'serviceUrgent',
          JSON.stringify(this.servicioUrgente)
        );
      });
    });
  }
  // validarHora(horaFin: string): number {
  //   if (!horaFin) {
  //     return 0; // Si horaFin es undefined, no hay horas extras
  //   }

  //   const horaLimite = '18:00'; // Puedes ajustar la hora límite según tus necesidades

  //   // Extraer horas de las cadenas de hora
  //   const [horaLimiteHoras] = horaLimite.split(':').map(Number);
  //   const [horaFinHoras] = horaFin.split(':').map(Number);

  //   // Comparar solo las horas
  //   if (horaFinHoras >= horaLimiteHoras) {
  //     // Calcular la cantidad de horas extras
  //     return horaFinHoras - horaLimiteHoras;
  //   } else {
  //     return 0; // No hay horas extras
  //   }
  // }
}
