import { Component, Input } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import { Subscription } from 'rxjs';
import { NgModel } from '@angular/forms';
import { FacturesService } from '../../services/factures.service';
import {
  FactureServiceHeaderUser,
  GetEmployeeDetail,
} from '../../interfaces/factureHeaderUser.interface';

@Component({
  selector: 'app-modal-facture',
  templateUrl: './modal-facture.component.html',
  styleUrls: ['./modal-facture.component.css'],
  providers: [NgModel],
})
export class ModalFactureComponent {
  facturas: [] = [];
  dataEmployees: GetEmployeeDetail[] = [];
  ServicesPending: FactureServiceHeaderUser[] = [];
  detailOrders: any[] = [];
  rating: number = 0;
  employeeId: number;

  idServicesDetails: number;
  comentario: string = '';
  editing = false;
  editedOrder: any;
  orders = [];
  private subscription: Subscription;

  constructor(
    private dataSharingService: DataSharingService,
    private factureService: FacturesService
  ) {}

  ngOnInit() {
    // Data Factura
    this.dataSharingService.obtenerDetalleData().subscribe((detalle) => {
      this.facturas = detalle;
    });
    // Data Empleado - calificar
    this.dataSharingService.obtenerDataEmployee().subscribe((employee) => {
      this.dataEmployees = employee;
    });
    // Data Ordenes Pendientes-Reservadas
    this.dataSharingService
      .obtenerDetalleData()
      .subscribe((orderPendingRes) => {
        this.ServicesPending = orderPendingRes;
      });
    // Data Fechas Detalle
    this.dataSharingService.ordersDetail.subscribe(
      (orderDetailsDateResponse) => {
        this.detailOrders = orderDetailsDateResponse;
        console.log(this.detailOrders);
      }
    );
  }

  toggleEditDate(order: any) {
    this.editing = true;
    this.editedOrder = { ...order }; // Crear una copia del objeto para la edición
  }

  cancelEditing() {
    this.editing = false;
    this.editedOrder = null;
  }

  saveChanges() {
    this.editing = false;
    this.editedOrder = null;
  }
  onRatingChange(newRating: number) {
    this.rating = newRating;
  }
  onKeyUp(comentario) {
    this.comentario = comentario;
  }
  calificarEmpleado() {
    this.dataEmployees.forEach((employee) => {
      this.employeeId = employee.idEmpl;
      this.idServicesDetails = employee.idServicesDetails;
    });
    const calificacion = {
      idEmpl: this.employeeId,
      idServicesDetails: this.idServicesDetails,
      rate: this.rating,
      comment: this.comentario,
    };
    this.factureService.CalificarEmpleado(calificacion).subscribe(
      (res) => {
        console.log('respuesta:', res);
      },
      (error) => {
        if (error.status === 500) {
          alert(error.error);
        }
      }
    );
  }
  onImageError(item: any) {
    const defaultImage: string = '../../../../assets/images/no-image.jpg';
    item.profileImage = defaultImage;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
