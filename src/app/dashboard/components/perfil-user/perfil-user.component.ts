import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TypServ, User, UserData } from '../../interfaces/employees.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatesService } from '../../services/states.service';
import { ServicesTypeService } from '../../services/services-type.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import {
  Ciudades,
  Departamentos,
} from '../../interfaces/ubication-response.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.css'],
})
export class PerfilUserComponent {
  loading: boolean = true;
  formulario: FormGroup;
  respuestaError: string = '';
  id: number;
  traerInfo!: any;
  porcentaje: number = 0;

  sexoOptions = [
    { id: 'M', name: 'Hombre' },
    { id: 'F', name: 'Mujer' },
  ];
  idenTypeOptions = [
    { id: 'Cedula', name: 'Cédula' },
    { id: 'Passport', name: 'Passport' },
  ];

  StatesCombo: Departamentos[] = [];
  CitiesCombo: Ciudades[] = [];

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private stateService: StatesService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      sexo: ['', Validators.required],
      idenType: ['', Validators.required],
      ServTyp: ['', Validators.required],
      birthday: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      numberidentification: ['', Validators.required],
      address: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
    });
    this.updateProgress();
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('userData'));
    sessionStorage.clear();

    this.id = user.sid;

    this.formulario.valueChanges.subscribe(() => {
      this.updateProgress();
    });

    this.obtenerStatesServiceCombo();
    const urlActual = this.router.url;
    if (urlActual != '/addUser') {
      this.obtenerUsuario();
    }
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

        case 'email':
          return 'Ingresa un correo valido';
      }
    }
    return null;
  }
  updateProgress() {
    const totalCampos = Object.keys(this.formulario.controls).length;
    const camposCompletados = Object.values(this.formulario.controls).filter(
      (control) => control.valid
    ).length;

    this.porcentaje = (camposCompletados / totalCampos) * 100;
  }

  obtenerUsuario() {
    this.userService.getUserData(this.id).subscribe(
      (data) => {
        // Manejar la respuesta exitosa aquí
        this.traerInfo = data[0];

        // Formatear la fecha
        var formattedDate = formatDate(
          this.traerInfo.birthdayDate,
          'yyyy-MM-dd',
          'en'
        );
        this.obtenerCitiesServiceCombo(this.traerInfo.city.state.id);
        this.formulario.patchValue({
          name: this.traerInfo?.name,
          lastName: this.traerInfo?.lastName,
          email: this.traerInfo?.email,
          mobileNumber: this.traerInfo?.mobileNumber,
          phoneNumber: this.traerInfo?.phoneNumber,
          sexo: this.traerInfo?.gender,
          idenType: this.traerInfo?.identificationType,
          birthday: formattedDate,
          state: this.traerInfo.city.state?.id,
          city: this.traerInfo.city?.id,
          numberidentification: this.traerInfo?.numberIdentification,
          address: this.traerInfo?.address,
          lat: this.traerInfo?.lat,
          long: this.traerInfo?.long,
        });
      },
      (error) => {
        // Manejar el error aquí
        console.error(error.error);
      }
    );
  }

  obtenerCitiesServiceCombo(stateId: number) {
    this.stateService.getCities(stateId).subscribe(
      (data) => {
        // Manejar la respuesta exitosa aquí
        this.loading = false;
        this.respuestaError = '';
        this.CitiesCombo = data;
      },
      (error) => {
        // Manejar el error aquí
        this.loading = false;
        console.error(error.error);
        this.respuestaError = error.error;
      }
    );
  }

  obtenerStatesServiceCombo() {
    this.stateService.getStates().subscribe(
      (data) => {
        // Manejar la respuesta exitosa aquí
        this.loading = false;
        this.respuestaError = '';
        this.StatesCombo = data;
      },
      (error) => {
        // Manejar el error aquí
        this.loading = false;
        console.error(error.error);
        this.respuestaError = error.error;
      }
    );
  }

  agregar() {
    const usuario = {
      id: this.id,
      name: this.formulario.value.name,
      lastName: this.formulario.value.lastName,
      mobileNumber: String(this.formulario.value.mobileNumber) || '',
      phoneNumber: String(this.formulario.value.phoneNumber),
      identificationType: this.formulario.value.idenType,
      gender: this.formulario.value.sexo,
      numberIdentification: String(this.formulario.value.numberidentification),
      address: this.formulario.value.address,
      lat: this.formulario.value.lat,
      long: this.formulario.value.long,
      birthdayDate: this.formulario.value.birthday,
      profileImage: '',
      idCity: this.formulario.value.city,
      state: this.formulario.value.state,
    };
    this.userService.AddUsuarios(usuario).subscribe(
      (data) => {
        // Manejar la respuesta exitosa aquí
        this.loading = false;

        const mensaje = 'Sus datos fueron actualizados correctamente.';
        this.toastr.success(mensaje, 'Felicidades', { timeOut: 3000 });

        this.router.navigate(['/dashboard/portal-usuario']);
      },
      (error) => {
        // Manejar el error aquí
        this.loading = false;
        console.error(error.error);
        this.respuestaError = error.error;
      }
    );
  }
}
