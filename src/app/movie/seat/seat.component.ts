import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {

  public seats = new Array(13);
  public selectedSeats = [];
  public totalPrice = 0;
  public room;
  public phone;

  constructor(public roomService: RoomService,
              public authService: AuthService,
              public router: Router) {
    for (var i = 0; i < this.seats.length; ++i) {
      this.seats[i] = new Array(15);
      for (var j = 0; j < this.seats[i].length; ++j) {
        this.seats[i][j] = "empty";
      }
    }
  }


  ngOnInit() {
    this.room = this.roomService.roomData;
    this.phone = this.authService.thisUser.phone;
    console.log("this.room", this.room);
    this.loadData(this.room.roomId);
  }

  public loadData(roomId) {
    this.roomService.loadSeatInfo(roomId).subscribe(res => {
      console.log(res);
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
        if (this.selectedSeats[x][0] == i && this.selectedSeats[x][1] == j) {
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
