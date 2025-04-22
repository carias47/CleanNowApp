export interface ServiceHeader {
  userId: number;
  idPlan: number;
  idCity: number;
  department: string;
  zone?: string;
  location?: string;
  paymentDate?: Date;
  additionalRemarks?: string;
  idTypeService: number;
  servicePrice?: number;
  name: string;
  dateOfRequest?: Date;
  startDate?: Date;
  endDate?: Date;
  paymentMethod?: string;
  fullValue?: number;
  state?: string;
}

export interface DataToSend {
  option?: { id: number; name: string };
  dateRange?: { startDate: moment.Moment; endDate: moment.Moment };
}
