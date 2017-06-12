import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule,JsonpModule ,Http} from '@angular/http';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { MovieDescriptionComponent } from './movie/movie-description/movie-description.component';
import { SeatComponent } from './movie/seat/seat.component';
import { ConfirmOrderComponent } from './movie/confirm-order/confirm-order.component';
import { PaySuccessComponent } from './movie/pay-success/pay-success.component';

import { EqualValidator } from './directives/equal-validator.directive';

import {appRoutes} from './app.routes';

import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { MovieService } from './services/movie.service';
import { CinemaService } from './services/cinema.service';
import { ShowingService } from './services/showing.service';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    MovieDescriptionComponent,
    EqualValidator,
    SeatComponent,
    ConfirmOrderComponent,
    PaySuccessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    ApiService,
    MovieService,
    CinemaService,
    ShowingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
