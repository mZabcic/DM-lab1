import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private userService : UserService, private authService : AuthService, private router : Router, private teamService : TeamsService) { }

  user : any;
  currentTab : String = 'music';
  currentTeam : any;
  players : any;


  ngOnInit() {
    this.userService.current().subscribe((data) => {
      this.user = data;
      console.log(this.user);
    }, (e) => {
      this.authService.logout();
    })
  }

  refresh() {
    this.userService.refresh().subscribe((data) => {
      console.log(data);
      this.user = data;
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
        console.log(this.players);
      })
    }
  }

}
