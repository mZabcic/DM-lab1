import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private userService : UserService, private authService : AuthService) { }

  user : any;

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
      console.log(err);
    })
  }

}
