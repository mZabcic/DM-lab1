import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  url : string = 'https://api.football-data.org/v1/'
  options : any;

  constructor(private http : HttpClient) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('X-Auth-Token', '393953d32247465491731f5b9ac51eb3');
    this.options = {headers};
   }


   getFDInfo(team : any) : Observable<any> {
     return this.http.get<any>(this.url + "teams?name=" + encodeURI(team.name) , this.options).pipe();
      
   }

   getTeamPlayers(teamId : Number) : Observable<any> {
    return this.http.get<any>(this.url + "teams/" + teamId + '/players' , this.options).pipe();
     
  }

   saveFdId(fdId : Number, teamId : Number) {
     return this.http.post<any>("http://localhost:3000/team", {fdId : fdId, teamId : teamId}, this.options).pipe();
   }


}

