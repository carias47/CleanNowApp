export interface UbicationResponse {
  departament: string;
  city: string;
}

export interface Departamentos {
  id: number;
  name: string;
}

export interface Ciudades {
  id: number;
  name: string;
  yesPrice: boolean;
}

export interface CiudadIP {
  country:         string;
  stateorprovince: string;
  locality:        string;
  idCity:          number;
}
