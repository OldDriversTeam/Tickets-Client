import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {

  public seats;
  public selectedSeats = [];
  public totalPrice = 0;
  public room;
  public phone;
  public selectedMovie;

  constructor(public roomService: RoomService,
              public authService: AuthService,
              public movieService: MovieService,
              public router: Router) {
    this.selectedMovie = this.movieService.selectedMovie;
  }


  ngOnInit() {
    this.room = this.roomService.roomData;
    this.phone = this.authService.thisUser.phone;
    console.log("this.room", this.room);
    this.loadData(this.room.roomId, this.room.showingId);
  }

  public loadData(roomId, showingId) {
    this.roomService.loadSeatInfo(roomId).subscribe(res => {
      console.log("seatInfo", res);
      this.seats = new Array(res.row);
      for (var i = 0; i < this.seats.length; ++i) {
        this.seats[i] = new Array(res.col);
        for (var j = 0; j < this.seats[i].length; ++j) {
          this.seats[i][j] = "empty";
        }
      }
      this.roomService.getSoldSeatList(showingId).subscribe(res => {
        console.log("res.seatSoldList", res);
        if (res.seatSoldList) {
          for (var i = 0; i < res.seatSoldList.length; ++i) {
            this.seats[res.seatSoldList[i][0]-1][res.seatSoldList[i][1]-1] = "unavailable";
          }
        }
      },
      error => {
        console.log(error);
      })
    },
    error => {
      console.log(error);
    });
  }

  public toggleSeat(i, j) {
    if (this.seats[i][j] === "empty") {
      if (this.selectedSeats.length < 5) {
        this.seats[i][j] = "selected";
        var seatInfo = [i+1, j+1];
        this.selectedSeats.push(seatInfo);
        this.totalPrice += this.room.price;
      } else {
        alert("最多可以选择5个座位");
      }
    } else if (this.seats[i][j] == "selected") {
      this.seats[i][j] = "empty";
      for (var x = 0; x < this.selectedSeats.length; ++x) {
        if (this.selectedSeats[x][0] == i + 1 && this.selectedSeats[x][1] == j + 1) {
          this.selectedSeats.splice(x, 1);
          break;
        }
      }
      this.totalPrice -= this.room.price;
    } else {

    }
  }

  public confirmSeat() {
    if (this.selectedSeats.length != 0) { 
      this.roomService.roomData.seats = this.selectedSeats;
      this.roomService.roomData.totalPrice = this.totalPrice;
      this.router.navigateByUrl("confirmOrder");
    } else {
      alert("请选择座位");
    }
  }

}
