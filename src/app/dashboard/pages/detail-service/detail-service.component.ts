import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllEmployees } from '../../interfaces/employees.interface';
import 'moment/locale/es';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import moment from 'moment';

@Component({
  selector: 'app-detail-service',
  templateUrl: './detail-service.component.html',
  styleUrls: ['./detail-service.component.css'],
})
export class DetailServiceComponent {
  @Input() auxiliaresInfo: AllEmployees;
  @Output() dataChanged = new EventEmitter();

  isLoading: boolean = false;
  selectedOption: number;
  siValue: boolean = false;
  noValue: boolean = false;
  selectedValue: number;

  public locale: LocaleConfig = {
    applyLabel: 'Aplicar',
    cancelLabel: 'Cancelar',
    customRangeLabel: 'Rango Personalizado',
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    format: 'DD/MM/YYYY',
  };

  private _selected: { startDate: moment.Moment; endDate: moment.Moment };

  get selected(): { startDate: moment.Moment; endDate: moment.Moment } {
    return this._selected;
  }

  set selected(value: { startDate: moment.Moment; endDate: moment.Moment }) {
    this._selected = value;
    if (this._selected && this._selected.startDate && this._selected.endDate) {
      this.dataChanged.emit({ dateRange: this._selected });
    }
  }

  get formattedRange(): string {
    if (this.selected && this.selected.startDate && this.selected.endDate) {
      return `Desde: ${this.selected.startDate.format(
        'DD/MM/YYYY HH:mm'
      )} Hasta: ${this.selected.endDate.format('DD/MM/YYYY HH:mm')}`;
    }

    return '';
  }

  ngOnInit() {
    moment.locale('es'); // Establecer el idioma español
  }

  onOptionChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const idTypeService = Number(selectElement.value);
    const nameTypeService =
      selectElement.options[selectElement.selectedIndex].text;
    this.dataChanged.emit({
      option: { id: idTypeService, name: nameTypeService },
    });
  }

  onCheckboxChange(option: number) {
    this.selectedOption = option;
    this.selectedValue = 0;
    this.emitData();
  }
  onSelectChange(timeServiceNight: any) {
    this.selectedValue = timeServiceNight.target.value;
    this.emitData();
  }

  emitData() {
    this.dataChanged.emit({
      checks: {
        option: this.selectedOption,
        timeServiceNight: this.selectedValue,
      },
    });
  }
}
