export interface AllEmployees {
  id: number;
  rate: number;
  comment: string;
  employee: Employee;
  characteristic: Characteristic;
}

export interface Characteristic {
  id: number;
  name: string;
  level: number;
  padreId: number;
}

export interface Employee {
  id: number;
  dateAdmission: Date;
  abilities: string;
  personality: string;
  hobbies: string;
  contextura: string;
  selfDescription: string;
  rateProm: number;
  user: UserData;
}

export interface UserData {
  id: number;
  name: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  phoneNumber: string;
  status: number;
  type: number;
  servicesType: { id: number; name: string } | null;
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
  city: {
    id: number;
    name: string;
    state: {
      id: number;
      name: string;
      country: {
        id: number;
        name: string;
        code: string;
      };
    };
  };
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

export interface TypServ {
  id: number;
  name: string;
}

export interface User {
  aud: string;
  country: string;
  emailaddress: string;
  exp: number;
  idCity: string;
  iss: string;
  locality: string;
  mobilephone: string;
  name: string;
  nameidentifier: string;
  role: string;
  sid: number;
  stateorprovince: string;
  surname: string;
}
