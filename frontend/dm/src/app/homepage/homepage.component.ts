import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TeamsService } from '../teams.service';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private userService : UserService, private authService : AuthService, private router : Router, private teamService : TeamsService, private musicService : MusicService) { }

  user : any;
  currentTab : String = 'music';
  currentTeam : any;
  players : any;
  albums : any;
  currentArtist : any;
  loader : boolean = false;
  refreshing : boolean = false;


  ngOnInit() {
    this.userService.current().subscribe((data) => {
      this.user = data;
      //console.log(this.user);
    }, (e) => {
      this.authService.logout();
    })
  }

  refresh() {
    this.refreshing = true;
    this.userService.refresh().subscribe((data) => {
      //console.log(data);
      this.user = data;
      this.refreshing = false;
    }, (err) => {
      this.authService.logout();
    })
  }

  select(tab : String) {
    this.currentTab = tab;
  }



  teamInfo(team : any) {
    this.currentTeam = team;
    this.players = [];
    if (team.fdId == null) {
       this.teamService.getFDInfo(team).subscribe(data => {
         if (data.teams.length == 0) {
           this.players = [];
           return
         }
         this.teamService.saveFdId(data.teams[0].id, team.id).subscribe((d) => {
           this.currentTeam = d;
            this.teamService.getTeamPlayers(this.currentTeam.fdId).subscribe((playerData) => {
              this.players = playerData;
            })
         }, (err) => {
           console.log(err);
         })
       })
    } else {
      this.currentTeam = team;
      this.teamService.getTeamPlayers(this.currentTeam.fdId).subscribe((playerData) => {
        this.players = playerData;
        this.players = this.players.players;
      //  console.log(this.players);
      })
    }
  }

  albumInfo(artist : any) {
    this.currentArtist = artist;
    this.albums = [];
    this.loader = true;
    var name = this.currentArtist.name;
      this.musicService.getAlbums(name).subscribe((data) => {
        if (data.topalbums != undefined) {
          this.albums = data.topalbums.album;
          for (let i = 0; i < this.albums.length; i++) {
            for (let j = 0; j <  this.albums[i].image.length; j++) {
              var text = JSON.stringify(this.albums[i].image[j]);
              text = text.replace('#','');
              this.albums[i].image[j] = JSON.parse(text);
            }
          }
         // console.log(this.albums)
        }
        this.loader = false;
      }, (err) => {
        this.loader = false;
      })
    }
  

}
