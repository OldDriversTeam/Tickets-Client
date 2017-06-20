import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { HomeComponent } from './home.component';

import { homeRoutes } from './home.routes';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),
    CarouselModule.forRoot()
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
