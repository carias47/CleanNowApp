import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticationService } from '../../services/autentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer-password',
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.css'],
})
export class RestablecerPasswordComponent {
  public formulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AutenticationService,
    private toastr: ToastrService,
    private router: Router
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
      const { email } = this.formulario.value;
      this.authService.forgotPassword(email).subscribe((res) => {
        const myConfig = {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
          closeButton: true,
        };
        if (res === 'el usuario no se encontró') {
          this.toastr.error(res.toString(), 'Fallo', myConfig);
          this.formulario.reset();
        }

        this.toastr.success(res.toString(), 'Exito', myConfig);
        this.formulario.reset();
        this.router.navigate(['/auth']);
      });
    }
  }
}
