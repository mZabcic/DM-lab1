import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';
import { AuthService } from './auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule }    from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from "angularx-social-login";
import { NavbarComponent } from './navbar/navbar.component';
import { ByeComponent } from './bye/bye.component';
import { FooterComponent } from './footer/footer.component';
import { UserService } from './user.service';
import { TeamsService } from './teams.service';
 
 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("188013922150830")
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("LinkedIn-client-Id", false, 'en_US')
  }
]);
 
export function provideConfig() {
  return config;
}



export function tokenGetter() {
  return localStorage.getItem('access_token');
}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    NavbarComponent,
    ByeComponent,
    FooterComponent
  ],
  imports: [
    SocialLoginModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/auth/']
      }
    })
  ],
  providers: [AuthGuard, AuthService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }, GuestGuard, UserService, TeamsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
