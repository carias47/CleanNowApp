import { Component } from '@angular/core';
import { FacturesService } from '../../services/factures.service';
import { FactureServiceHeaderUser } from '../../interfaces/factureHeaderUser.interface';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css'],
})
export class OrdenesComponent {
  factureData: FactureServiceHeaderUser[] = [];

  mostrarModal: boolean = false;
  constructor(
    private factureService: FacturesService,
    private dataSharingService: DataSharingService
  ) {}

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('userData'));
    this.factureService
      .GetServiceHeaderUser(user.sid, 'Pendiente')
      .subscribe((responseFacture) => {
        this.factureData = responseFacture;
      });
  }

  mostrarDetalle(id: number) {
    this.factureService.GetServicesDetail(id).subscribe((facturas) => {
      this.dataSharingService.enviarDetalleData(facturas);
    });
  }

  QualificationDetails(id: number) {
    this.factureService.GetDetailsEmployee(id).subscribe((empleado) => {
      this.dataSharingService.enviarDataEmployee(empleado);
    });
  }

  pendingOrders(id: number) {
    this.factureService
      .GetServicesPending(id)
      .subscribe((ordersPendingResponse) => {
        this.dataSharingService.enviarDetalleData(ordersPendingResponse);
      });
    this.detailDatesOrders(id);
  }

  detailDatesOrders(id: number) {
    this.factureService
      .GetServicesDetailDate(id)
      .subscribe((ordersPendingResponse) => {
        this.dataSharingService.ordersDetail.next(ordersPendingResponse);
      });
  }
}
