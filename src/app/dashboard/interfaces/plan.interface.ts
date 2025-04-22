export interface Plans {
  id: number;
  namePlan: string;
  days: number;
  description: string;
  discount: number;
  price: number;
}

export interface PlanResponse {
  id: number;
  namePlan: string;
  days: number;
  description: string;
  discount: number;
}
