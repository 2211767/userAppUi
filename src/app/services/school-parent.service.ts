import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolParentService {

  constructor(private httpClient: HttpClient) { }
  public saveStudent(schoolParent:any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:5002/api/v1/registerStudent' ,schoolParent, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
  }
  public updateStudent(schoolParent:any): Observable<String> {
    return this.httpClient.put<String>('http://localhost:5002/api/v1/updateStudent' ,schoolParent, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
  }
  public getStudent(): Observable<any> {
    return this.httpClient.get('http://localhost:5002/api/v1/getStudentDetails', { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} });
  }
}
