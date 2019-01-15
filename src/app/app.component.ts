import { Component } from '@angular/core';
import { FlightDataService } from './flight-data.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'FlightSearch';
  data: any;
  height = window.innerHeight - 55 - 17;
  width = window.innerWidth;
  displayData = false;
  alignForm = document.getElementById("fillData");
  flightData: any;
  flightDataArray: any;

  constructor(private flightService: FlightDataService) { }
  //service has the data for which I have done a call to Json data using Observables and subscribe (flight-data.service)

  ngOnInit() {
    this.data = this.getFlightDataService();
  }

  getFlightDataService(): void {
    //call for service
    this.flightService.getFlightData()
      .subscribe(flightData => this.flightData = flightData);
    return this.flightData;
  }

  ngAfterViewInit() {
    //before the DOM creation changes to the DOM elements
    d3.select(".mat-form-field-appearance-legacy .mat-form-field-prefix .mat-datepicker-toggle-default-icon, .mat-form-field-appearance-legacy .mat-form-field-suffix .mat-datepicker-toggle-default-icon")
      .style("fill", "white"); // calender color

    d3.select(".mat-form-field-infix")
      .style("border-top-width", 0)

    d3.select("#colTwo")
      .style("height", window.innerHeight - 55 + "px"); //height for the right div
  }

  //conversion of date 
  convertDate(date) {
    let formatInputDate = new Date(date);
    let convertDate = formatInputDate.toISOString().substring(0, 10);
    let splitDate = convertDate.split("-").reverse().join('/');
    return splitDate;
  }

  originOptions = ['Please Select Origin City', 'Pune', 'Delhi', 'Goa', 'Bangalore']; //dropdown for city
  destinationOptions = ['Please Select Destination City', 'Pune', 'Delhi', 'Goa', 'Bangalore'];
  numOfPassengers = ['Please Select the number', '1', '2', '3', '4', '5']; //dropdown for numOfPassengers

  //onClick of Search Button
  flightSearch(origin, destination, numOfPsg, date) {
    this.displayData = false;
    this.flightDataArray = [];

    //validations for origin and destination dropdown
    if (origin === this.originOptions[0] || destination === this.destinationOptions[0]) {
      if (origin === this.originOptions[0]) {
        document.getElementById('origin').style.borderColor = "red"; //If city is not selected, it is validated by red border
      }
      if (destination === this.destinationOptions[0]) {
        document.getElementById('destination').style.borderColor = "red"
      }
      else {
        document.getElementById('origin').style.borderColor = "red";
        document.getElementById('destination').style.borderColor = "red"
      }
      alert("Please select the city")
    }
    else {
      if (origin === '' || destination === '' || numOfPsg === this.numOfPassengers[0] || date === '') {
        alert("Please Fill All the Fields");
      } else {
        let flightData = this.data;
        var convertInputDate = new Date(date);
        let addOneDay = convertInputDate.setDate(convertInputDate.getDate() + 1);//since new Date() considers the first month as 0
        let inputedDate = this.convertDate(addOneDay);
        let flightDataLength = this.data.length;
        for (let i = 0; i < flightDataLength; i++) {
          let dateFormat = flightData[i].arrival;
          var formatDate = new Date(dateFormat);
          let newDate = this.convertDate(formatDate);
          let checkBoolean = newDate.localeCompare(inputedDate);
          if (flightData[i].origin === origin && flightData[i].destination === destination && checkBoolean === 0) {
            this.displayData = true;
            if (numOfPsg < flightData[i].availableSeats) {
              this.flightDataArray.push(flightData[i]);
            }

          }
        }
        if (this.displayData === false) {
          alert("No Flights found for the above data");
        }
      }
      document.getElementById('origin').style.borderColor = "black";
      document.getElementById('destination').style.borderColor = "black";
    }
  }
}
