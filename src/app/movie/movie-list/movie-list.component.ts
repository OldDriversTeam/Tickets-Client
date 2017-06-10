import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public movieList = [];

  constructor(public movieService: MovieService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.movieService.getMovieList().subscribe(res => {
      this.movieList = res;
    })
  }
}
