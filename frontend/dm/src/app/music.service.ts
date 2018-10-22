import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MusicService {

 

  constructor(private http : HttpClient) {
   }


  

   getAlbums(artistName : string) {
     return this.http.get<any>("http://localhost:3000/albums/" + encodeURI(artistName)).pipe();
   }


}

