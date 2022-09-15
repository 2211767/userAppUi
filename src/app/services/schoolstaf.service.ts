import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SchoolstafService {
  constructor(private httpClient: HttpClient) { }
  public getStudentDetails(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8086/api/v1/getAllStudentList', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
  }
  public updateStatus(registerId:String,status:string): Observable<any> {
    return this.httpClient.put('http://localhost:8086/api/v1/studentStatus/'+registerId+'/'+status, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
  }
  public updateCircular(circularData:string): Observable<any> { 
    return this.httpClient.put('http://localhost:8086/api/v1/studentNode/'+circularData,{ headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
  }
}
