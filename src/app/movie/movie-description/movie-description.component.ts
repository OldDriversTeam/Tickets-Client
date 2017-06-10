import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CinemaService } from '../../services/cinema.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.css']
})
export class MovieDescriptionComponent implements OnInit {
  public movie = {};
  public cinemaList = [];
  public dateList = ["6月5号(今天)", "6月6号", "6月7号"];
  public selectedCinemaIndex;
  public selectedDateIndex;

  constructor(public movieService: MovieService,
              public cinemaService: CinemaService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.loadData(params['id']);
    });
  }

  public loadData(id) {
    this.movieService.getMovieById(id).subscribe(res => {
      this.movie = res;
      console.log(this.movie);
    })
    this.cinemaService.getCinemaList().subscribe(res => {
      this.cinemaList = res;
      console.log(this.cinemaList);
    });
  }

  public selectCinema(cinema, i) {
    this.selectedCinemaIndex = i;
  }

  public selectDate(date, i) {
    this.selectedDateIndex = i;
  }
}
