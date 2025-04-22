import { Component, EventEmitter, Output } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent {
  public selectedId: string = '';

  constructor(public placesService: PlacesService) {}
  
  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }
 

  sendData(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.placesService.setSelectedPlace(place.text_es);
    this.placesService.deletePlaces();
  }
}
