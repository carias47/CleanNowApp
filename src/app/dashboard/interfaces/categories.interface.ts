export interface AllCategories {
  id: number;
  name: string;
  level: number;
  dateCreate: Date;
  padreId: number;
  price: number;
  idCityPrice: number;
}

export interface SelectedCategories {
  id: number;
  price: number;
  selected?: boolean;
  characteristicsCategory: CharacteristicsCategory;
  city: City;
  active?: boolean;
  idCityPrice: number;
}

export class FechaSeleccionada {
  fecha: string;
  horaInicio: string;
  horaFin: string;

  constructor(fecha: string, horaInicio: string, horaFin: string) {
    this.fecha = fecha;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
  }
}

export interface CharacteristicsCategory {
  id: number;
  name: string;
  idCategory: number;
  days: number;
}

export interface ServiceUrgent {
  id: number;
  service: string;
  price: number;
  hr: number;
}

export interface City {
  state: string | null;
  id: number;
  name: string;
}
