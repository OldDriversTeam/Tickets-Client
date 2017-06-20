import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CinemaService } from '../../services/cinema.service';
import { ShowingService } from '../../services/showing.service';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';

import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
  public dateList = [];
  public showDateList = [];
  public selectedCinemaIndex = 0;
  public selectedDateIndex = 0;

  constructor(public movieService: MovieService,
              public cinemaService: CinemaService,
              public showingService: ShowingService,
              public roomService: RoomService,
              public authService: AuthService,
              public route: ActivatedRoute,
              public router: Router,
              public toastr: ToastsManager) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
      this.loadData(params['id']);
    });
  }

  public loadData(id) {
    this.movieService.getMovieById(id).subscribe(res => {
      this.movie = res;
      console.log("thisMovie", this.movie);
    },
    error => {
      console.log(error);
    });

    this.cinemaService.getCinemaList(id).subscribe(res => {
      this.cinemaData = res.showingList;
      console.log("this.cinemaData", this.cinemaData)
      if (this.cinemaData[0] && this.cinemaData[0].cinemaList) {
        this.cinemaList = this.cinemaData[0].cinemaList;
      }
      if (this.cinemaData[0] && this.cinemaData[0].date) {
        this.dateList.push(this.cinemaData[0].date);
        let month = this.cinemaData[0].date.substring(5, 7);
        let day = this.cinemaData[0].date.substring(8, 10);
        if (month[0] === '0') month = month[1];
        if (day[0] === '0') day = day[1];
        let time = month + '月' + day + '日';
        this.showDateList.push(time);
      }
      if (this.cinemaData[1] && this.cinemaData[1].date) {
        this.dateList.push(this.cinemaData[1].date);
        let month = this.cinemaData[1].date.substring(5, 7);
        let day = this.cinemaData[1].date.substring(8, 10);
        if (month[0] === '0') month = month[1];
        if (day[0] === '0') day = day[1];
        let time = month + '月' + day + '日';
        this.showDateList.push(time);
      }
      if (this.cinemaList.length != 0) {
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
      this.loadShowingList(this.cinemaList[this.selectedCinemaIndex].id, this.dateList[this.selectedDateIndex], this.movieId);
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
      for (var i = 0; i < this.showingList.length; ++i) {
        let hour = this.showingList[i].time.substring(0, 2);
        let minute = this.showingList[i].time.substring(3, 5);
        this.showingList[i].time = hour + ":" + minute;
      }
      console.log("this.showingList", this.showingList);
    },
    error => {
      console.log(error);
    });
  }

  public buyTickets(showing) {
    if (this.authService.isLogin()) {
      console.log("showing", showing)
      let time = this.showDateList[this.selectedDateIndex] + ' ' + showing.time;
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
      this.router.navigateByUrl("/seat");
    } else {
      this.toastr.success('请先登录再购票', '系统提示');
    }
  }
}
