import { Injectable } from '@angular/core';
import { flightDetails } from './data';
import { flightDetailsFormat } from './dataFormat';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FlightDataService {

  data = flightDetails;
  constructor() { }
  //call for data using observables
  getFlightData(): Observable<flightDetailsFormat[]> {
    return of(this.data);
  }
}
