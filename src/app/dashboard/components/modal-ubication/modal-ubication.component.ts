import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  Ciudades,
  Departamentos,
  UbicationResponse,
} from '../../interfaces/ubication-response.interface';
import { UbicationService } from '../../services/ubication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-modal-ubication',
  templateUrl: './modal-ubication.component.html',
})
export class ModalUbicationComponent implements OnInit {
  departamentos: Departamentos[] = [];

  public ciudadesByDepartamento: Ciudades[] = [];

  @Output() ciudadSeleccionada = new EventEmitter<{}>();
  public myForm: FormGroup = this.fb.group({
    Departamento: ['', Validators.required],
    Ciudad: ['', Validators.required],
  });

  constructor(
    private ubicationService: UbicationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getDepartamentos();
    this.OnDepartamentosChanged();
  }

  getDepartamentos(): void {
    this.ubicationService.getDepartaments().subscribe((departamentos) => {
      this.departamentos = departamentos;
    });
  }

  OnDepartamentosChanged(): void {
    this.myForm
      .get('Departamento')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('Ciudad')!.setValue('')),
        switchMap((ciudad) =>
          this.ubicationService.getCiudadesByDepartamento(ciudad)
        )
      )
      .subscribe((ciudades) => {
        this.ciudadesByDepartamento = ciudades;
      });
  }
  SaveCiudadSelected() {
    const location = {
      city: this.myForm.get('Ciudad').value,
      departament: this.myForm.get('Departamento').value,
    };
    const response: UbicationResponse = location;
    if (location) {
      this.ciudadSeleccionada.emit(response);
      this.ubicationService.getUbication(response);
    }
  }
}
