export interface FactureServiceDetail {
  id: number;
  servicesHeader: ServicesHeader;
  auxiliaries: Auxiliaries;
  characteristicsCityPrice: CharacteristicsCityPrice;
  quantity: number;
  value: number;
  productsAdded: number;
  unitprice: number;
  iva: number;
  totalValue: number;
  descriptionProduct: string;
  discount: number;
}

export interface Auxiliaries {
  id: number;
  name: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  phoneNumber: string;
  status: number;
  type: number;
  servicesType: ServicesType;
  role: number;
  balance: number;
  identificationType: string;
  gender: string;
  numberIdentification: null | string;
  address: null | string;
  lat: null | string;
  long: null | string;
  birthdayDate: Date;
  profileImage: string;
  createdDate: Date;
  points: number;
  city: null;
}

export interface CharacteristicsCityPrice {
  id: number;
  characteristicsCategory: CharacteristicsCategory;
  city: City;
  price: number;
}

export interface CharacteristicsCategory {
  id: number;
  name: string;
  idCategory: number;
  days: number;
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

export interface ServicesHeader {
  id: number;
  user: Auxiliaries;
  plan: Plan;
  city: City;
  department: string;
  zone: string;
  location: null;
  paymentDate: Date;
  additionalRemarks: null;
  servicesType: ServicesType;
  name: string;
  dateOfRequest: Date;
  startDate: Date;
  endDate: Date;
  paymentMethod: null;
  value: number;
  iva: number;
  totalValue: number;
  state: string;
}

export interface Plan {
  id: number;
  namePlan: string;
  days: number;
  daysMax: number;
  description: string;
  discount: number;
  price: number;
}
export interface ServicesType {
  id: number;
  name: string;
}
