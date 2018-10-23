import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { GamesService } from '../games.service';

@Component({
  selector: 'app-gamesbygenre',
  templateUrl: './gamesbygenre.component.html',
  styleUrls: ['./gamesbygenre.component.css']
})
export class GamesbygenreComponent implements OnInit {
  id: number;
  private sub: any;
  games : Array<any>;
  genre : any;
  gameLoading : boolean = true;

  constructor(private route : ActivatedRoute, private gamesService : GamesService) { }

  ngOnInit() {
    this.games = new Array<any>();
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
      this.gamesService.getGenre(this.id).subscribe((data) => {
         this.genre = data[0];
         for (let i = 0; i < 12; i++) {
           this.gamesService.getGameInfoById(this.genre.games[i]).subscribe((d) => {
              this.games.push(d[0]);
              if (i == 11) {
                this.gameLoading = false;
              }
           })
         }
      })
   });
  }

}
