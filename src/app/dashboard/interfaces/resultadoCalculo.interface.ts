import { Plans } from "./plan.interface";

export interface ResultadoCalculo {
    idPlan?:             number;
    productsAdded?:      number;
    idCharacCity?:       number;
    quantity?:           number;
    unitPrice?:          number;
    value?:              number;
    iva?:                number;
    totalValue?:         number;
    valueSinDesc?:       number;
    ivaSinDesc?:         number;
    totalValueSinDesc?:  number;
    descriptionProduct?: string;
    discount?:           number;
}


export interface Contrato {
    plan: Plans;
}