import { Component } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrls: ['./map-location.component.css'],
})
export class MapLocationComponent {
  private debouncetimer?: NodeJS.Timeout;
  selectedPlace: string = '';
  

  constructor(public placesService: PlacesService) {}

  get isUserLocationReady() {
    return this.placesService.isLocationReady;
  }

  ngOnInit() {
    this.placesService.selectedPlace$.subscribe((placeName) => {
      this.selectedPlace = placeName;
    });
  }
  onQueryChange(query: string = '') {
    if (this.debouncetimer) clearTimeout(this.debouncetimer);
    this.debouncetimer = setTimeout(() => {
      this.placesService.getPlacesQuery(query);
    }, 500);
  }
}
