export interface FactureServiceHeaderUser {
  id: number;
  user: User;
  plan: string;
  city: null;
  department: string;
  zone: string;
  location: string;
  paymentDate: Date;
  additionalRemarks: string;
  servicesType: ServicesType;
  name: string;
  dateOfRequest: Date;
  startDate: Date;
  endDate: Date;
  paymentMethod: string;
  value: number;
  iva: number;
  totalValue: number;
  state: string;
}

export interface ServicesType {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  phoneNumber: string;
  status: number;
  type: number;
  servicesType: null;
  role: number;
  balance: number;
  identificationType: string;
  gender: string;
  numberIdentification: null;
  address: null;
  lat: null;
  long: null;
  birthdayDate: Date;
  profileImage: string;
  createdDate: Date;
  points: number;
  city: City;
}

export interface City {
  state: State;
  id: number;
  name: string;
}

export interface State {
  country: null;
  id: number;
  name: string;
}

export interface QualifityEmployee {
  idEmpl: number;
  idServicesDetails: number;
  rate: number;
  comment: string;
}

export interface GetEmployeeDetail {
  name: string;
  lastName: string;
  profileImage: string;
  idEmpl: number;
  idServicesDetails: number;
  descriptionProduct: string;
}
