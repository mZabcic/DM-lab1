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
  private loggedIn: boolean;
  private loader : boolean = false;

  constructor(private socialAuthService : SocialAuthService, private authService : CustomAuthService, public router: Router) { }

  ngOnInit() {
    
    
  }

  startLogin() {
    this.loader = true;
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      
      this.loggedIn = (user != null);
      console.log(this.loggedIn);
      if (this.loggedIn) {
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



