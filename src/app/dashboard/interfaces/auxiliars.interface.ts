export interface AuxiliarsToService {
  id:             number;
  rate:           number;
  comment:        null | string;
  employee:       Employee;
  characteristic: Characteristic;
}

export interface Characteristic {
  id:      number;
  name:    string;
  level:   number;
  padreId: number;
}

export interface Employee {
  id:              number;
  dateAdmission:   Date;
  abilities:       string;
  personality:     string;
  hobbies:         string;
  contextura:      string;
  selfDescription: string;
  rateProm:        number;
  user:            User;
}

export interface User {
  id:                 number;
  name:               string;
  lastName:           string;
  fullName:           string;
  status:             number;
  type:               number;
  role:               number;
  email:              string;
  cellPhone:          string;
  phone:              string;
  balance:            number;
  identificationType: string;
  gender:             string;
  birthday:           null;
  imageProfile:       string;
  dateCreate:         null;
  login:              null;
  points:             number;
  city:               City;
}

export interface City {
  state: State;
  id:    number;
  name:  string;
}

export interface State {
  country: null;
  id:      number;
  name:    string;
}
