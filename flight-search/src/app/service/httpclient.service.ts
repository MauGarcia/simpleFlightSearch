import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

export class Flight{
  constructor(
    public flightNumber:string,
    public carrier:string,
    public origin:string,
    public departure:string,
    public destination:string,
    public arrival:string,
    public aircraft:string,
    public distance:number,
    public travelTime:string,
    public status:string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) {}

  getVuelos(flightNumber : String, origin : String, destination : String, date : String) {
    console.log('http://localhost:8080/flights?flightNumber=' 
    + flightNumber + '&origin=' + origin + '&destination=' + destination + '&arrival='+ date +'');
      return this.httpClient.get<Flight[]>('http://localhost:8080/flights?flightNumber=' 
      + flightNumber + '&origin=' + origin + '&destination=' + destination + '&arrival='+ date +'');
    }
  }