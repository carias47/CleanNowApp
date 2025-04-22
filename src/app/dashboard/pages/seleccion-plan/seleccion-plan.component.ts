import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlansService } from '../../services/plans.service';
import { Plans } from '../../interfaces/plan.interface';
import { MinutasService } from '../../services/minutas.service';
import { Contrato } from '../../interfaces/resultadoCalculo.interface';
import { parse } from 'date-fns';

@Component({
  selector: 'app-seleccion-plan',
  templateUrl: './seleccion-plan.component.html',
  styleUrls: ['./seleccion-plan.component.css'],
})
export class SeleccionPlanComponent implements OnInit {
  @Input() plansRecommended: Plans[];
  @Input() fechasServicio: any;
  @Output() contratoRealizado: EventEmitter<Contrato> =
    new EventEmitter<Contrato>();

  plans: Plans[] = [];
  idCharacCity: number;
  fechaInicioServicio: Date;
  fechaFinServicio: Date;
  loading: boolean = true;

  constructor(
    private planService: PlansService,
    private minutaService: MinutasService
  ) {}

  ngOnInit() {
    this.planService.getPlans().subscribe((planResponse) => {
      this.plans = planResponse;
    });
    this.minutaService.selectedIdCharact.subscribe(
      (id) => (this.idCharacCity = id)
    );
  }
  isPlanRecommended(plan: Plans): boolean {
    return this.plansRecommended.some(
      (recommendedPlan) => recommendedPlan.namePlan === plan.namePlan
    );
  }
  getCardClass(plan: Plans): string {
    return this.isPlanRecommended(plan) ? 'recommended-card' : '';
  }
  contratarPlan(plan: Plans) {
    this.fechaInicioServicio = parse(
      this.fechasServicio[0],
      'dd/MM/yyyy',
      new Date()
    );
    this.fechaFinServicio = parse(
      this.fechasServicio[1],
      'dd/MM/yyyy',
      new Date()
    );
    const contrato: Contrato = {
      plan: plan,
    };
    this.contratoRealizado.emit(contrato);
  }
}
