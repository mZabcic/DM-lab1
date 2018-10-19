import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }             from './login/login.component';
import { HomepageComponent }             from './homepage/homepage.component';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';
import { ByeComponent } from './bye/bye.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard]  },
  { path: 'bye', component: ByeComponent, canActivate: [GuestGuard]  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}