import { Component } from '@angular/core';
import flatpickr from 'flatpickr';
import { Options } from 'flatpickr/dist/types/options';
import { Spanish } from 'flatpickr/dist/l10n/es';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UbicationService } from '../../services/ubication.service';
import {
  Ciudades,
  Departamentos,
} from '../../interfaces/ubication-response.interface';
import { switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { DataSharingService } from '../../services/data-sharing.service';
import moment from 'moment';
import { FechaSeleccionada } from '../../interfaces/categories.interface';

@Component({
  selector: 'app-selection-services',
  templateUrl: './selection-services.component.html',
  styleUrls: ['./selection-services.component.css'],
})
export class SelectionServicesComponent {
  departamentos: Departamentos[] = [];
  days: number;
  idCiudad: number;
  categories: any;
  fechasSeleccionadas: FechaSeleccionada[] = [];
  categoriaSeleccionada: string;
  idCategory: number = 0;
  fechaIndividual: string;
  ciudadSeleccionada: Ciudades;
  startTime: string;
  endTime: string;
  myDate: string;
  parsedDataCiudad: Ciudades;

  public ciudadesByDepartamento: Ciudades[] = [];

  public myForm: FormGroup = this.fb.group({
    Departamento: ['', Validators.required],
    Ciudad: ['', Validators.required],
  });

  constructor(
    private ubicationService: UbicationService,
    private fb: FormBuilder,
    private dataService: DataSharingService,
    private toastr: ToastrService
  ) {
    this.dataService.currentPage.next(1);
  }

  ngOnInit() {
    const storedCategory = sessionStorage.getItem('selectedCategory');
    this.idCategory = parseInt(storedCategory, 10);

    const options: Options = {
      dateFormat: 'd-m-Y',
      mode: 'single',
      locale: Spanish,
      minDate: 'today',
    };
    const optionsTime: Options = {
      enableTime: true,
      noCalendar: true,
      dateFormat: 'H:i K',
    };
    flatpickr('#yourInputId', options);
    flatpickr('#startTimeInput', optionsTime);
    flatpickr('#endTimeInput', optionsTime);
    this.OnDepartamentosChanged();
    this.getDepartamentos();
    this.seleccionarValor(this.idCategory);

    const departamento = sessionStorage.getItem('seleccionDepartamento');
    const ciudad = sessionStorage.getItem('seleccionCiudad');
    const parsedDataDepartament = JSON.parse(departamento);
    this.parsedDataCiudad = JSON.parse(ciudad);
    const fechas = sessionStorage.getItem('fechas');
    const fechasParsed = JSON.parse(fechas);

    fechasParsed?.forEach((element) => {
      console.log(element);

      (this.myDate = element.fecha),
        (this.startTime = element.horaInicio),
        (this.endTime = element.horaFin);
    });

    if (departamento) {
      this.myForm.patchValue({
        Departamento: parsedDataDepartament.name,
        Ciudad: this.parsedDataCiudad.name,
      });
    }
  }
  seleccionarValor(valor: number) {
    this.idCategory = valor;

    if (this.idCategory >= 1) {
      this.dataService.idCategorySubject.next(this.idCategory);
      sessionStorage.setItem('selectedCategory', this.idCategory.toString());
    }

    switch (this.idCategory) {
      case 1:
        this.categoriaSeleccionada = 'Hogar';
        break;
      case 2:
        this.categoriaSeleccionada = 'Pymes';
        break;
      case 3:
        this.categoriaSeleccionada = 'Edificios';
        break;
      default:
        this.categoriaSeleccionada = null;
    }
    this.enviarDatosAlResumen();
  }
  mostrarFechasSeleccionadas() {
    if (this.myDate && this.startTime && this.endTime) {
      const selectedDates = this.myDate;

      const fechaSeleccionada = new FechaSeleccionada(
        this.myDate,
        this.startTime,
        this.endTime
      );

      const fechaExistente = this.fechasSeleccionadas.find(
        (fecha) => fecha.fecha === this.myDate
      );

      if (fechaExistente) {
        // Si la fecha ya existe, muestra un mensaje de advertencia
        this.toastr.warning('La fecha seleccionada ya existe.', '', {
          timeOut: 1000,
        });
      } else {
        // Si la fecha no existe, agrégala al array

        this.fechasSeleccionadas.push(fechaSeleccionada);
      }
      sessionStorage.setItem(
        'fechas',
        JSON.stringify(this.fechasSeleccionadas)
      );
      this.dataService.fechas.next(this.fechasSeleccionadas);

      // Verificar si alguna de las fechas seleccionadas es hoy
      const hoy = moment();
      const fechaHoy = selectedDates.split(',').filter((fecha: string) => {
        this.fechaIndividual = fecha;
        const fechaMoment = moment(fecha, 'DD-MM-YYYY');
        return fechaMoment.isSame(hoy, 'day');
      });
      const diaHoy = fechaHoy.toString();

      // if (this.fechaIndividual === diaHoy) {
      //   this.dataService.serviceUrgente().subscribe((urgentService) => {
      //     this.dataService.DateToDay.next(urgentService);
      //   });
      // } else {
      //   this.dataService.DateToDay.next(null);
      // }
    }
  }

  getDepartamentos(): void {
    this.ubicationService.getDepartaments().subscribe((departamentos) => {
      this.departamentos = departamentos;
    });
  }

  OnDepartamentosChanged(): void {
    this.myForm
      .get('Departamento')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('Ciudad')!.setValue('')),
        switchMap((ciudad) =>
          this.ubicationService.getCiudadesByDepartamento(ciudad)
        )
      )
      .subscribe((ciudades) => {
        this.ciudadesByDepartamento = ciudades;
      });
  }
  onDepartChange(event) {
    const depart = event.target.value;

    const filterDepart = this.departamentos.find(
      (departamento) => departamento?.name === depart
    );

    sessionStorage.setItem(
      'seleccionDepartamento',
      JSON.stringify(filterDepart)
    );
  }
  onCiudadChange(event) {
    const ciudadName = event.target.value;
    const filterCiudad = this.ciudadesByDepartamento.find(
      (ciudad) => ciudad?.name === ciudadName.toString()
    );

    this.ciudadSeleccionada = filterCiudad;
    this.dataService.idCity.next(this.ciudadSeleccionada?.id);

    sessionStorage.setItem('seleccionCiudad', JSON.stringify(filterCiudad));

    this.enviarDatosAlResumen();

    if (this.ciudadSeleccionada.yesPrice == false) {
      const mensaje =
        'No hay servicios disponibles para esta ciudad. comuniquese con un asesor';
      this.toastr.warning(mensaje, 'Atención', { timeOut: 2000 });
    }
    if (!this.idCategory) {
      const mensaje = 'Selecciona una categoria para poder continuar';
      this.toastr.info(mensaje, 'Atención', { timeOut: 3000 });
    }
    this.idCiudad = filterCiudad.id;

    const sendToTable = {
      idCategory: this.idCategory,
      idCity: this.idCiudad,
    };

    this.dataService.setDataTable(sendToTable);
  }
  enviarDatosAlResumen() {
    const ciudadSeleccionada = this.myForm.get('Ciudad').value;

    const datosSeleccionados = {
      categoria: this.categoriaSeleccionada,
      destino: {
        departamento: this.myForm.get('Departamento').value,
        ciudad: ciudadSeleccionada.name,
      },
    };

    this.dataService.setSelectedData(datosSeleccionados);
  }
}
