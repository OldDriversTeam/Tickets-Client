import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CinemaService } from '../../services/cinema.service';
import { ShowingService } from '../../services/showing.service';
import { RoomService } from '../../services/room.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.css']
})
export class MovieDescriptionComponent implements OnInit {
  public movieId;
  public movie = {};
  public cinemaData = [];
  public cinemaList = [];
  public showingList = [];
  public dateList = ["6月5号(今天)", "6月6号", "6月7号"];
  public selectedCinemaIndex = 0;
  public selectedDateIndex = 0;

  constructor(public movieService: MovieService,
              public cinemaService: CinemaService,
              public showingService: ShowingService,
              public roomService: RoomService,
              public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
      this.loadData(params['id']);
    });
  }

  public loadData(id) {
    this.movieService.getMovieById(id).subscribe(res => {
      this.movie = res;
    },
    error => {
      console.log(error);
    });

    this.cinemaService.getCinemaList(id).subscribe(res => {
      this.cinemaData = res.showingList;
      if (this.cinemaData[0] && this.cinemaData[0].cinemaList) {
        this.cinemaList = this.cinemaData[0].cinemaList;
        this.loadShowingList(this.cinemaList[this.selectedCinemaIndex].id, this.dateList[this.selectedDateIndex], id);
      }
    },
    error => {
      console.log(error);
    });
  }

  public selectCinema(cinema, i) {
    this.selectedCinemaIndex = i;
    this.loadShowingList(cinema.id, this.dateList[this.selectedDateIndex], this.movieId);
  }

  public selectDate(date, i) {
    this.selectedDateIndex = i;
    if (this.cinemaData[i] && this.cinemaData[i].cinemaList) {
      this.cinemaList = this.cinemaData[i].cinemaList;
      this.loadShowingList(this.cinemaList[this.selectedCinemaIndex].id, date, this.movieId);
    }
  }

  private loadShowingList(cinemaId, date, movieId) {
    let reqData = {
      cinemaId: cinemaId,
      date: date,
      movieId: movieId
    }

    this.showingService.getShowingList(reqData).subscribe(res => {
      this.showingList = res.showingList;
      console.log(this.showingList);
    },
    error => {
      console.log(error);
    });
  }

  public setRoomData(showing) {
    this.roomService.roomData = {
      cinemaName: this.cinemaList[this.selectedCinemaIndex].name,
      roomName: showing.roomName,
      time: this.dateList[this.selectedDateIndex] + ' ' + showing.time,
      seat: [],
      price: showing.price,
      totalPrice: null
    }
  }
}
