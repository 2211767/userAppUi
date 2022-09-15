import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   constructor(private httpClient: HttpClient) { }
  public post(user: any): Observable<any> {
    return this.httpClient.post('http://localhost:5005/api/user/v1/loginUser', user);
  }
}
