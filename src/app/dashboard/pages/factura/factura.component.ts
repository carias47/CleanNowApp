import { Component } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import {
  FactureServiceHeaderUser,
  GetEmployeeDetail,
} from '../../interfaces/factureHeaderUser.interface';
import { FacturesService } from '../../services/factures.service';
import { FactureServiceDetail } from '../../interfaces/factureServiceDetail.interface';
import { DetailsServicesService } from '../../services/details-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent {
  dataEmployees: GetEmployeeDetail[] = [];
  detailsFacture: FactureServiceDetail[] = [];
  headerFactura: FactureServiceDetail;
  idHeader: number;
  isLoading: boolean = false;
  loading: boolean = false;

  constructor(
    private dataSharingService: DataSharingService,
    private factureService: FacturesService,
    private detailService: DetailsServicesService,
    private router: Router
  ) {
    this.dataSharingService.currentPage.next(3);
  }
  ngOnInit() {
    this.loading = true;
    const idHeaderStorage = sessionStorage.getItem('idHeader');
    const userLoggeado = localStorage.getItem('userData');
    if (userLoggeado) {
      setTimeout(() => {
        this.idHeader = JSON.parse(idHeaderStorage);
        console.log(this.idHeader);

        this.factureService
          .GetServicesDetail(this.idHeader)
          .subscribe((facturas) => {
            console.log(facturas);

            this.detailsFacture = facturas;
            this.detailsFacture.forEach((r) => {
              this.headerFactura = r;
            });
            this.loading = false;
          });
      }, 3000);
    } else {
      this.router.navigate(['auth/signin']);
      sessionStorage.clear();
    }
  }

  pagar() {
    const idHeaderStorage = sessionStorage.getItem('idHeader');
    this.idHeader = JSON.parse(idHeaderStorage);
    this.isLoading = true;
    setTimeout(() => {
      this.detailService
        .getLinkPay(this.idHeader)
        .subscribe((linkPay: string) => {
          this.isLoading = false;

          window.location.href = linkPay;
          sessionStorage.clear();
        });
    }, 4000);
  }
}
