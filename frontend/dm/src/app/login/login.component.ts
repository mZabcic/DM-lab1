import { Component, OnInit } from '@angular/core';
import { AuthService as SocialAuthService,SocialUser } from "angularx-social-login";
import { AuthService as CustomAuthService } from '../auth.service';
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  private loader : boolean = false;

  constructor(private socialAuthService : SocialAuthService, private authService : CustomAuthService, public router: Router) { }

  ngOnInit() {
    
    
  }

  startLogin() {
    this.loader = true;
    this.router.navigate(['fblogin']);
  }

}



