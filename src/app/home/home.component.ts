import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movieList = [];

  constructor(public movieService: MovieService) { }

  ngOnInit() {
  	this.loadData();
  }

  public loadData() {
  	this.movieService.getMovieCoverList().subscribe(res => {
  		if (res && res.movieList) {
  			this.movieList = res.movieList;
  		}
  	})
  }

}
