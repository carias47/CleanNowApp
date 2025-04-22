import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapLocationComponent } from './components/map-location/map-location.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [MapLocationComponent, LoadingComponent, SearchResultsComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [
    MapLocationComponent
  ]
})
export class MapsModule { }
