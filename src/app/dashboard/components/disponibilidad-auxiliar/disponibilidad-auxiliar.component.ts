import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';

import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DetailsServicesService } from '../../services/details-services.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-disponibilidad-auxiliar',
  templateUrl: './disponibilidad-auxiliar.component.html',
  styleUrls: ['./disponibilidad-auxiliar.component.css'],
  providers: [DatePipe],
})
export class DisponibilidadAuxiliarComponent {
  loading: boolean = true;
  auxiliarDisponibilidad: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 'auto',
    contentHeight: 'auto',
    plugins: [dayGridPlugin],
    events: this.auxiliarDisponibilidad,

    locale: esLocale,
    headerToolbar: {
      start: '',
      center: 'title',
      end: '',
    },
    dayHeaderFormat: { weekday: 'long' },
    eventTimeFormat: { hour: 'numeric', minute: '2-digit', meridiem: 'short' },
  };

  constructor(
    private detailsServicesService: DetailsServicesService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loading = true;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const daysInMonth = new Date(year, month, 0).getDate();
    this.detailsServicesService.idAuxiliar.subscribe((r) => {
      if (r) {
        this.auxiliarDisponibilidad = [];
        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(year, month - 1, i);
          const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
          this.detailsServicesService
            .getAvailableEmployees(r, formattedDate)
            .subscribe((data) => {
              if (data.length > 0) {
              } else {
                this.auxiliarDisponibilidad.push({
                  title: 'DISPONIBLE',
                  start: formattedDate,
                  end: formattedDate,
                  color: 'green',
                });
              }

              data.forEach((element) => {
                this.auxiliarDisponibilidad.push({
                  title: element.available,
                  start: formattedDate,
                  end: formattedDate,
                  color: 'red',
                });
              });

              this.auxiliarDisponibilidad = [...this.auxiliarDisponibilidad];
              this.actualizarEventosCalendario();
            });
        }
      }
    });
  }

  actualizarEventosCalendario() {
    this.calendarOptions.events = this.auxiliarDisponibilidad;
    this.loading = false;
  }
}
