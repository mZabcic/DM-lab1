import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService,   private http: HttpClient, public router: Router) {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    // true or false
    
    return token == null ? false : true;
  }


  public logout()  {
    localStorage.removeItem('access_token');
    this.router.navigate(['bye']);
  }




  public login(data) : Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
      headers.append('Access-Control-Allow-Headers','Content-Type');
    const url = "http://localhost:3000/login";
    return this.http.post<any>(url, data , { headers }).pipe();
  }
}