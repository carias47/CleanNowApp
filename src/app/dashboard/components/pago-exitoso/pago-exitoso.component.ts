import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MinutaServiceInterface } from '../../interfaces/minuta.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinutasService } from '../../services/minutas.service';
import { DetailsServicesService } from '../../services/details-services.service';

@Component({
  selector: 'app-pago-exitoso',
  templateUrl: './pago-exitoso.component.html',
  styleUrls: ['./pago-exitoso.component.css'],
})
export class PagoExitosoComponent {
  idServiceHeader: number;
  formularioEnviado: boolean = false;
  mostrarAgradecimiento: boolean = false;

  public formulario: FormGroup = this.fb.group({
    lugar: ['', Validators.required],
    transporte: [''],
    espacios: ['', Validators.required],
    nombre: ['', Validators.required],
    ocupacion: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private minutaService: MinutasService,
    private detailService: DetailsServicesService
  ) {}

  minutaData: MinutaServiceInterface;
  linkPay: string;
  ngOnInit(): void {
    this.detailService.selectedId$.subscribe((id) => {
      this.idServiceHeader = id;
    });
    const linkPayProcess = sessionStorage.getItem('preocessPay');
    this.linkPay = JSON.parse(linkPayProcess);
  }

  isNotValidField(field: string): boolean | null {
    return (
      this.formulario.controls[field].errors &&
      this.formulario.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.formulario.controls[field]) return null;
    const errors = this.formulario.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
      }
    }
    return null;
  }

  enviarFormulario() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    if (this.formulario.valid) {
      const { lugar, transporte, espacios, nombre, ocupacion } =
        this.formulario.value;
      const datos = {
        idServicesHeader: this.idServiceHeader,
        puntoReferencia: lugar,
        medioTransporte: transporte,
        espaciosInmueble: espacios,
        nombresPreguntar: nombre,
        ocupacion: ocupacion,
      };

      this.detailService.StatusOrdenComplete(this.idServiceHeader).subscribe();

      this.minutaService.postSendMinutas(datos).subscribe();
      this.formulario.reset();
      this.formularioEnviado = true;
      this.mostrarAgradecimiento = true;
    }
  }

  volver() {
    this.router.navigate(['/dashboard']);
  }

  PayProcess() {
    window.location.href = this.linkPay;
  }
}
