import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  public current() : Observable<any> {
    const url = "http://localhost:3000/user";
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer' + localStorage.getItem('access_token'));
    return this.http.get(url, {headers}).pipe();
  }


  public refresh() : Observable<any> {
    const url = "http://localhost:3000/user/refresh";
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer' + localStorage.getItem('access_token'));
    return this.http.get(url, {headers}).pipe();
  }
  
}
