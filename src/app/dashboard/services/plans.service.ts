import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PlanResponse, Plans } from '../interfaces/plan.interface';
import { Observable, map } from 'rxjs';
import { SelectedCategories } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  _baseUrl = environment.baseUrl;
  planes: Plans[] = [];

  constructor(private http: HttpClient) { }

  getPlans(): Observable<Plans[]> {
    return this.http.get<Plans[]>(`${this._baseUrl}/Plan`);
  }

  getRecommendedPlans(minDays: number): Observable<Plans[]> {
    return this.getPlans().pipe(
      map((plans) => plans.filter((plan) => Math.abs(plan.days - minDays) <= 2))
    );
  }

  getPlanDay(day: number) {
    return this.http.get<PlanResponse>(`${this._baseUrl}/Plan/Getdays/${day}`);
  }
  GetCharacteristics(
    level: number,
    idCity: number
  ): Observable<SelectedCategories[]> {
    return this.http.get<SelectedCategories[]>(
      `${this._baseUrl}/Characteristic/GetCharacteristicLevelCity?level=${level}&IdCity=${idCity}`
    );
  }
}
