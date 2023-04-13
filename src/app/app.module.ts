import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { AuthModule } from './auth/auth.module';
import { ProfileComponent } from './components/profile/profile.component';
import { DepartureComponent } from './routes/departure/departure.component';
import { HttpClientModule} from '@angular/common/http';
import { SearchBarComponent } from './routes/search-bar/search-bar.component';
import { ArrivalComponent } from './routes/arrival/arrival.component';
import { DepartureDateComponent } from './routes/departure-date/departure-date.component';
import { DepartureTimeComponent } from './routes/departure-time/departure-time.component';
import { SeatsComponent } from './routes/seats/seats.component';
import { PriceComponent } from './routes/price/price.component';
import { CommentComponent } from './routes/comment/comment.component';
import { CardSearchComponent } from './card-search/card-search.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { AskDeleteRouteWindowComponent } from './components/ask-delete-route-window/ask-delete-route-window.component';
import { InfoRouteWindowComponent } from './components/info-route-window/info-route-window.component';

//ANGULAR MATERIAL COMPONENTS


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule} from '@angular/material/tabs';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    ProfileComponent,
    DepartureComponent,
    SearchBarComponent,
    ArrivalComponent,
    DepartureDateComponent,
    DepartureTimeComponent,
    SeatsComponent,
    PriceComponent,
    CommentComponent,
    CardSearchComponent,
    PageNotFoundComponent,
    AskDeleteRouteWindowComponent,
    InfoRouteWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,

    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatSelectModule,
    MatIconModule,
    HotToastModule.forRoot(),
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
