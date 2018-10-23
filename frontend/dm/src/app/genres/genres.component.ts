import { Component, OnInit } from '@angular/core';
import { GamesService } from '../games.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  constructor(private gamesService : GamesService, private router : Router) { }
  genres : any;
  gameLoading : boolean = true;
  ngOnInit() {
    this.gamesService.getGenres().subscribe((d) => {
      this.genres = d;
      this.gameLoading = false;
    })
  }

  navigate(id : Number) {
    this.router.navigate(['genres', id]);
  }
}
