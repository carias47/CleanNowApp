import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApi } from '../api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private selectedPlaceSubject = new BehaviorSubject<string>('');
  selectedPlace$ = this.selectedPlaceSubject.asObservable();

  userLocation?: [number, number];
  isLoadingPlaces: boolean = false;
  places: Feature[] = [];
  noResultsMessage: string = ''; 

  get isLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(public placesApi: PlacesApi) {
    this.getUserLocation();
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolver, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolver(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la Geolocalización.');
          console.log(err);
        }
      );
    });
  }

  getPlacesQuery(query: string = '') {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    this.isLoadingPlaces = true;
    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation.join(','),
        },
      })
      .subscribe((resp) => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
        if(this.places.length === 0){
          this.noResultsMessage = 'No se encontraron resultados para la busqueda.'
        }
      else {
        this.noResultsMessage = ''; // Restablecer el mensaje de no results
      }
        
      });
  }

  setSelectedPlace(placeName: string) {
    this.selectedPlaceSubject.next(placeName);
  }

  deletePlaces(){
    this.places = [];
  }
}
