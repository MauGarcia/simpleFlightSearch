import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClientService } from '../service/httpclient.service';
import { TabHeadingDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  
  numVuelo: string;
  origin: string;
  destination: string;
  date: string;
  flights:string[];
  dayCalendar:String[] = [];
  activeSearch:boolean;
  existenVuelos:boolean;
  day : string;
  month : string;
  year : string;
  warningFields : string;
  fieldFlag: boolean;

  constructor(private httpClientService:HttpClientService) { }

  searchFlightForm : FormGroup;

  ngOnInit() {
    for (let i = 0; i < 32; i++) {            
      this.dayCalendar.push(""+ i);
    }

    this.activeSearch = false;
    this.existenVuelos = false;
    this.fieldFlag = false;

    this.searchFlightForm = new FormGroup({
      flightNumber: new FormControl(), 
      origin: new FormControl(),
      destination: new FormControl(),
      year: new FormControl(),
      month: new FormControl(),
      day: new FormControl()});
  }

  validaCampos(){

    this.fieldFlag = false;

    this.numVuelo = this.searchFlightForm.get('flightNumber').value;
    this.origin = this.searchFlightForm.get('origin').value;
    this.destination = this.searchFlightForm.get('destination').value;
    this.year = this.searchFlightForm.get('year').value;
    this.month = this.searchFlightForm.get('month').value;
    this.day = this.searchFlightForm.get('day').value;

    if(this.numVuelo == null || this.numVuelo == "" || this.origin == null || this.origin == "" || this.destination == null || this.destination == "" 
      || this.year == null || this.year == "" || this.month == null || this.month == "" || this.day == null || this.day == "" ){
      this.fieldFlag = true;
      this.activeSearch = false;
      this.existenVuelos = false;
      this.warningFields = "Please fill all the fields!" ;
    }
    else{
      this.fieldFlag = false;
      this.buscaVuelos();
    }
    
  }

  buscaVuelos(){

    this.activeSearch = true;
    this.existenVuelos = false;

    this.flights = [];

    this.numVuelo = this.searchFlightForm.get('flightNumber').value;
    this.origin = this.searchFlightForm.get('origin').value;
    this.destination = this.searchFlightForm.get('destination').value;
    this.date = this.searchFlightForm.get('year').value + this.searchFlightForm.get('month').value + this.searchFlightForm.get('day').value;
    
    console.log(this.numVuelo);

    this.httpClientService.getVuelos(this.numVuelo, this.origin, this.destination, this.date).subscribe(
      response =>this.handleSuccessfulResponse(response),
     );
  }

  handleSuccessfulResponse(response){
    this.flights=response;

    console.log(this.flights);

     if( this.flights == null || this.flights.length == 0 ) {
      this.existenVuelos = false;
    } else { this.existenVuelos = true }
  }
}
