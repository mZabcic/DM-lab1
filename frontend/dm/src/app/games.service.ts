import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

 

  constructor(private http : HttpClient) {
   }


  

   getGameInfoByName(gameName : string) {
     return this.http.get<any>("http://localhost:3000/games/name/" + encodeURI(gameName)).pipe();
   }

   getGameInfoById(gameId : Number) {
    return this.http.get<any>("http://localhost:3000/games/" + gameId).pipe();
  }

  getGenre(id : Number) {
    return this.http.get<any>("http://localhost:3000/genre/" + id).pipe();
  }

  getGenres() {
    return this.http.get<any>("http://localhost:3000/genre").pipe();
  }



}

