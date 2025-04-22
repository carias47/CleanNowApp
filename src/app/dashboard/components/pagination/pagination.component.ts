import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { User } from '../../interfaces/employees.interface';
import { ToastrService } from 'ngx-toastr';
import {
  Ciudades,
  Departamentos,
} from '../../interfaces/ubication-response.interface';
import { DetailsServicesService } from '../../services/details-services.service';
import { DataSharingService } from '../../services/data-sharing.service';
import { AuxiliarsToService } from '../../interfaces/auxiliars.interface';
import { SelectedCategories } from '../../interfaces/categories.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  loading: boolean = false;
  currentPage = 1;
  user: User;
  parsedDataDepartament: Departamentos;
  parsedCiudad: Ciudades;
  categorySelected: number;
  planSelected: any;
  idServiceHeader: number;
  fechasSelected: any[] = [];
  employees: AuxiliarsToService[];
  characteristics: SelectedCategories[] = [];
  private routerSubscription: Subscription;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private detailService: DetailsServicesService,
    private dataSharingService: DataSharingService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadAuxiliars();
    this.cargarCharacteristic();

    const waitForResponse = new Promise<void>((resolve) => {
      this.dataSharingService.currentPage.subscribe((r) => {
        this.currentPage = r;
        this.cdRef.detectChanges(); // <-- Esto fuerza la actualización
        resolve();
      });
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  obtenerSessionStorageData() {
    const userParsed = localStorage.getItem('userData');
    const departamento = sessionStorage.getItem('seleccionDepartamento');
    const ciudad = sessionStorage.getItem('seleccionCiudad');
    const category = sessionStorage.getItem('selectedCategory');
    const plan = sessionStorage.getItem('planSelected');
    const fechasStorage = sessionStorage.getItem('fechas');

    this.parsedDataDepartament = JSON.parse(departamento);
    this.parsedCiudad = JSON.parse(ciudad);
    this.user = JSON.parse(userParsed);
    this.categorySelected = JSON.parse(category);
    this.planSelected = JSON.parse(plan);
    this.fechasSelected = JSON.parse(fechasStorage);
  }
  loadAuxiliars() {
    return this.detailService.employees.subscribe((response) => {
      this.employees = response;
    });
  }
  cargarCharacteristic() {
    return this.dataSharingService.characteristics.subscribe((r) => {
      this.characteristics = r;
    });
  }

  nextPage() {
    if (this.currentPage < 3) {
      this.currentPage++;
      console.log(this.currentPage);

      if (this.currentPage === 2) {
        this.router.navigate(['/dashboard/selection-auxiliars']);
      }
      if (this.currentPage === 3) {
        this.loading = true;
        this.obtenerSessionStorageData();
        this.loading = true;
        if (this.user) {
          const serviceHeader = {
            userId: this.user.sid,
            idPlan: this.planSelected?.id,
            idCity: this.parsedCiudad?.id,
            department: this.parsedDataDepartament.name,
            state: this.parsedDataDepartament.name,
            zone: this.parsedCiudad.name,
            idTypeService: this.categorySelected,
            name: this.user.name,
            startDate: new Date(),
            paymentDate: new Date(),
            dateOfRequest: new Date(),
            endDate: new Date(),
          };

          this.detailService
            .headerServices(serviceHeader)
            .subscribe((idHeaderResponse) => {

              this.idServiceHeader = Number(idHeaderResponse);
              sessionStorage.setItem('idHeader', JSON.stringify(this.idServiceHeader));

              // Auxiliaries disponibles para cada fecha
              this.fechasSelected.forEach((res) => {
                this.detailService
                  .auxiliarsAvailables(
                    res.fecha,
                    res.horaInicio,
                    res.horaFin,
                    this.idServiceHeader
                  )
                  .subscribe();
              });

              // Ahora creamos un detail por cada empleado
              if (
                this.characteristics && this.characteristics.length > 0 &&
                this.employees && this.employees.length > 0
              ) {
                const detailRequests = this.employees.map((idEmployee) => {
                  const detailService = {
                    idServicesHeader: this.idServiceHeader,
                    employeesAuxiliariesValue: idEmployee,
                    idCharacCity: this.characteristics[0].idCityPrice, // tomamos el primer idCityPrice
                    quantity: 1,
                    productsAdded: 0,
                  };

                  return this.detailService.detailService(detailService);
                });

                forkJoin(detailRequests).subscribe({
                  next: () => {
                    this.detailService.updateServicesHeader(this.idServiceHeader)
                      .subscribe((res) => {
                        console.log('respuesta', res);
                        this.loading = false;
                        this.router.navigate(['/dashboard/confirmacion-pago']);
                      });
                  },
                  error: (error) => {
                    console.error('Error al crear detalles:', error);
                    this.loading = false;
                  }
                });

              } else {
                console.error('No hay características o empleados cargados');
                this.loading = false;
              }

            });
        } else {
          this.router.navigate(['/auth/login']);
          this.currentPage = 1;
          this.loading = false;
          this.toastr.warning(
            'Debes iniciar sesión para poder continuar con el proceso.',
            'Advertencia'
          );
        }
      }
    }
  }

  prevPage() {
    this.currentPage--;
    if (this.currentPage === 1) {
      this.router.navigate(['/dashboard/listado']);
    }
    if (this.currentPage === 2) {
      this.router.navigate(['/dashboard/selection-auxiliars']);
    }
  }
  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
