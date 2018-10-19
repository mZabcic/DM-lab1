import { Component, OnInit } from '@angular/core';
import { AuthService as CustomAuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService : CustomAuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
