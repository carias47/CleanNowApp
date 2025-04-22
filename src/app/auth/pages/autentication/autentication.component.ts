import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticationService } from '../../services/autentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-autentication',
  templateUrl: './autentication.component.html',
  styleUrls: ['./autentication.component.css'],
})
export class AutenticationComponent {
  public formulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AutenticationService,
    private toastr: ToastrService
  ) {}

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

        case 'email':
          return 'Ingresa un correo valido';
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
      const { email, password } = this.formulario.value;

      this.authService.loginClient(email, password).subscribe(
        (respLogin) => {},
        (error) => {
          const myConfig = {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            progressBar: true,
            closeButton: true,
          };
          this.toastr.error('Email o Contraseña incorrecto', 'Error', myConfig);
          this.formulario.reset();
        }
      );
    }
  }
}
