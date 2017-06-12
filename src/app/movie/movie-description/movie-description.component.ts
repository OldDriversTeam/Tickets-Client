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
  public dateList = ["2017-06-12", "2017-06-13"];
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
      console.log("this.showingList", this.showingList);
    },
    error => {
      console.log(error);
    });
  }

  public setRoomData(showing) {
    console.log("showing", showing)
    let date = this.dateList[this.selectedDateIndex];
    let month = date.substring(5, 7);
    if (month[0] === '0') month = month[1];
    let day = date.substring(8, 10);
    if (day[0] === '0') day = day[1];
    let hour = showing.time.substring(0, 2);
    let minute = showing.time.substring(3, 5);
    let time = month + '月' + day + '日 ' + hour + ':' + minute;
    this.roomService.roomData = {
      showingId: showing.showingId,
      cinemaName: this.cinemaList[this.selectedCinemaIndex].name,
      roomName: showing.roomName,
      roomId: showing.roomId,
      time: time,
      seats: [],
      price: showing.price,
      totalPrice: null
    }
  }
}
