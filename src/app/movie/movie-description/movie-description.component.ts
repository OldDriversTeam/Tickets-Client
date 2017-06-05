import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CinemaService } from '../../services/cinema.service';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.css']
})
export class MovieDescriptionComponent implements OnInit {
  public movie = {};
  public cinemaList = [];
  public selectedCinemaIndex;

  constructor(public movieService: MovieService,
              public cinemaService: CinemaService) { }

  ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.movie = this.movieService.getMovieById(1);
    this.cinemaService.getCinemaList().subscribe(res => {
      this.cinemaList = res;
      console.log(this.cinemaList);
    });
  }

  public selectCinema(cinema, target, i) {
    this.selectedCinemaIndex = i;
  }
}
