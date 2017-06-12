import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {

  public seats = new Array(13);
  public selectedSeats = [];
  public room;

  constructor(public roomService: RoomService) {
    for (var i = 0; i < this.seats.length; ++i) {
      this.seats[i] = new Array(15);
      for (var j = 0; j < this.seats[i].length; ++j) {
        this.seats[i][j] = "empty";
      }
    }
    this.room = this.roomService.roomData;
  }


  ngOnInit() {
  }

  public toggleSeat(i, j) {
    if (this.seats[i][j] === "empty") {
      this.seats[i][j] = "selected";
      var seatInfo = {
        row: null,
        col: null
      }
      seatInfo.row = i;
      seatInfo.col = j;
      this.selectedSeats.push(seatInfo);
    } else if (this.seats[i][j] == "selected") {
      this.seats[i][j] = "empty";
      for (var x = 0; x < this.selectedSeats.length; ++x) {
        if (this.selectedSeats[x].row == i && this.selectedSeats[x].col == j) {
          this.selectedSeats.splice(x, 1);
          break;
        }
      }
    } else {

    }
  }

}
