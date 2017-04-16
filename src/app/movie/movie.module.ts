import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MovieListComponent } from './movie-list/movie-list.component';

import { movieRoutes } from './movie.routes';
import { MovieBoxComponent } from './movie-box/movie-box.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(movieRoutes)
  ],
  declarations: [MovieListComponent, MovieBoxComponent]
})
export class MovieModule { }
