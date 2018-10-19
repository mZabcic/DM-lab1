import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private userService : UserService) { }

  user : any;

  ngOnInit() {
    this.userService.current().subscribe((data) => {
      console.log(data);
    }, (e) => {
      console.log(e);
    })
  }

}
