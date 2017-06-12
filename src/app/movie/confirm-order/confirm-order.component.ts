import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  public room;
  public phone;

  constructor(public roomService: RoomService,
  			  public authService: AuthService,
  			  public ticketService: TicketService,
  			  public router: Router) {
  	this.room = this.roomService.roomData;
  	this.phone = this.authService.thisUser.phone;
  }

  ngOnInit() {
  }

  public confirmOrder() {
  	console.log("room", this.room);
  	let reqData = {
  		showingId: this.room.showingId,
  		userId: this.authService.thisUser.id,
  		count: this.room.seats.length,
  		seats: this.room.seats
  	}
  	this.ticketService.buyTicket(reqData).subscribe(res => {
  		console.log(res);
  		this.router.navigateByUrl("/paySuccess");
  	},
    error => {
      console.log(error);
    });
  }

}
