import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { DepartureComponent } from './routes/departure/departure.component';
import { ArrivalComponent } from './routes/arrival/arrival.component';
import { DepartureDateComponent } from './routes/departure-date/departure-date.component';
import { DepartureTimeComponent } from './routes/departure-time/departure-time.component';
import { SeatsComponent } from './routes/seats/seats.component';
import { PriceComponent } from './routes/price/price.component';
import { CommentComponent } from './routes/comment/comment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainpageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: PasswordResetComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'departure', component: DepartureComponent, canActivate: [AuthGuard]},
  {path: 'arrival', component: ArrivalComponent, canActivate: [AuthGuard]},
  {path: 'departure-date', component: DepartureDateComponent, canActivate: [AuthGuard]},
  {path: 'departure-time', component: DepartureTimeComponent, canActivate: [AuthGuard]},
  {path: 'seats', component: SeatsComponent, canActivate: [AuthGuard]},
  {path: 'price', component: PriceComponent, canActivate: [AuthGuard]},
  {path: 'comment', component: CommentComponent, canActivate: [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
