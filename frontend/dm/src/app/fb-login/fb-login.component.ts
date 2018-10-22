import { Component, OnInit } from '@angular/core';
import { AuthService as SocialAuthService,SocialUser } from "angularx-social-login";
import { AuthService as CustomAuthService } from '../auth.service';
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';


@Component({
  selector: 'app-fblogin',
  templateUrl: './fb-login.component.html',
  styleUrls: ['./fb-login.component.css']
})
export class FbLoginComponent implements OnInit {

  private user: SocialUser;
  private loader : boolean = false;

  constructor(private socialAuthService : SocialAuthService, private authService : CustomAuthService, public router: Router) { }

  ngOnInit() {
    
    this.startLogin();
  }

  startLogin() {
    this.loader = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      
      if (localStorage.getItem('access_token') == null) {
        this.login();
      }
      this.loader = false;
      
    }, (err) => {
      this.loader = false;
    });
  }

  login() {
      this.authService.login({authToken : this.user.authToken, id : this.user.id, photoUrl : this.user.photoUrl}).subscribe((data) => {
        localStorage.setItem('access_token', data.token);
        this.router.navigate(['home']);
      }, (err) => {  console.log(err); });
    
  }

}