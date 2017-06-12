import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  public room;
  public phone;

  constructor(public roomService: RoomService,
  			  public authService: AuthService) {
  	this.room = this.roomService.roomData;
  	this.phone = this.authService.thisUser.phone;
  }

  ngOnInit() {
  }

  public confirmOrder() {
  	
  }

}
