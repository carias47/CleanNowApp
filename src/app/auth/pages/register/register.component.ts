import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticationService } from '../../services/autentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public loading = false;

  public formulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    celular: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[0-9]+$'),
      ],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AutenticationService,
    private toastr: ToastrService,
    private router: Router
  ) { }

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

        case 'pattern':
          return 'Solo se permiten números en este campo.';

        case 'minlength':
          return `El número debe ser de ${errors['minlength'].requiredLength} caracters.`;

        case 'maxlength':
          return `El número debe ser de ${errors['maxlength'].requiredLength} caracters.`;
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
      this.loading = true;

      const { nombre, apellido, email, celular } = this.formulario.value;
      const datos = {
        name: nombre,
        lastName: apellido,
        email,
        mobileNumber: celular,
        link: 'https://example.com',
      };
      this.authService
        .register(datos)
        .subscribe(
          (response) => {
            const myConfig = {
              timeOut: 7000,
              positionClass: 'toast-top-right',
              preventDuplicates: true,
              progressBar: true,
              closeButton: true,
            };
            this.toastr.success(
              `Bienvenido ${nombre} a Clean Now, te enviaremos un correo con los detalles de tu cuenta`,
              'Usuario creado',
              myConfig
            );
            this.formulario.reset();
            this.router.navigate(['auth/signin']);
          },
          (error) => {
            console.error('Ocurrió un error en el servidor:', error.message);
            const errorConfig = {
              timeOut: 7000,
              positionClass: 'toast-top-right',
              preventDuplicates: true,
              progressBar: true,
              closeButton: true,
            };
            this.toastr.error(
              'El email ingresado ya se encuentra en uso.',
              'Error',
              errorConfig
            );
          }
        )
        .add(() => {
          this.loading = false;
        });
    }
  }
}
