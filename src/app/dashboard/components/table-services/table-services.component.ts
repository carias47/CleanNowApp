import { Component, Input } from '@angular/core';
import { Plans } from '../../interfaces/plan.interface';
import { PlansService } from '../../services/plans.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { SelectedCategories } from '../../interfaces/categories.interface';
import { ToastrService } from 'ngx-toastr';
import { Ciudades } from '../../interfaces/ubication-response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-services',
  templateUrl: './table-services.component.html',
  styleUrls: ['./table-services.component.css'],
})
export class TableServicesComponent {
  selectedCategories: SelectedCategories[];
  subtotal: number = 0;
  planes: Plans[] = [];
  opcionSeleccionada: any = '';
  loading: boolean = false;
  idCity: number;
  diasAcordesPlan: boolean = true;
  characteristicSelected: SelectedCategories[] = [];
  planesRecomended: SelectedCategories[] = [];
  arregloResultante = [];

  constructor(
    private dataSharingService: DataSharingService,
    private planServices: PlansService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.planServices.getPlans().subscribe((plansResponse) => {
      this.planes = plansResponse;
      console.log('Planes:', this.planes);

    });

    this.dataSharingService.idCity.subscribe((r) => (this.idCity = r));
  }

  onChangeSeleccion() {
    sessionStorage.setItem(
      'planSelected',
      JSON.stringify(this.opcionSeleccionada)
    );

    const ciudad = sessionStorage.getItem('seleccionCiudad');
    const ciudadParsed = JSON.parse(ciudad);
    this.idCity = ciudadParsed.id;

    this.loading = true;

    this.dataSharingService.idCategorySubject.subscribe((idCategory) => {
      const days = this.opcionSeleccionada.days;

      this.dataSharingService.pricePlan.next(this.opcionSeleccionada.price);
      //precio del plan ----->
      sessionStorage.setItem('precioPlan', this.opcionSeleccionada.price);

      this.dataSharingService.fechas.subscribe((acordePlanResponse) => {
        if (acordePlanResponse?.length >= days) {
          console.log('usted solo puede agregar 1 a 2 días acorde al plan');
        }
        if (idCategory) {
          console.log('ID de la categoría:', idCategory);

          this.planServices.getPlanDay(days).subscribe((r) => {

            this.planServices
              .GetCharacteristics(idCategory, this.idCity)
              .subscribe((resCategories) => {
                this.planesRecomended = resCategories;

                this.arregloResultante = [];
                this.loading = false;
                this.planesRecomended.forEach((serviciosPlan) => {
                  console.log('planes', serviciosPlan);
                  if (serviciosPlan.active) {
                    this.arregloResultante.push(serviciosPlan);
                    this.calculateSubtotal(serviciosPlan);
                  }
                });
                this.dataSharingService.characteristics.next(
                  this.arregloResultante
                );
              });
          });
        }
      });

    });
  }

  calculateSubtotal(value) {
    const index = this.arregloResultante.findIndex(
      (item) => item.id === value.id
    );

    if (value.active === false) {
      if (index === -1) {
        // Si no existe en el arreglo, lo agregamos
        this.arregloResultante.push(value);
      } else {
        // Si ya existe en el arreglo, eliminamos todas las instancias
        this.arregloResultante = this.arregloResultante.filter(
          (item) => item.id !== value.id
        );
      }
    }

    value.selected = !value.selected;

    const activeCategories = this.planesRecomended.filter(
      (item) => item.active
    );

    const selectedCategories = this.planesRecomended.filter(
      (item) => item.selected && !item.active
    );

    const combinedCategories = activeCategories.concat(selectedCategories);

    this.dataSharingService.setSubtotal(combinedCategories);

    this.planesRecomended.forEach((item) => {
      if (!item.selected && combinedCategories.includes(item)) {
        combinedCategories.splice(combinedCategories.indexOf(item), 1);
      }
    });

    this.dataSharingService.setSubtotal(combinedCategories);
  }
}
