import { Injectable } from '@angular/core';

@Injectable()
export class RoomService {

  public roomData = {
  	cinemaName: null,
  	roomName: null,
  	time: null,
  	seat: [],
  	price: null,
  	totalPrice: null
  }

  constructor() { }

  public setRoomData(data) {
  	this.roomData = data;
  }

  public getRoomData(data) {
  	return this.roomData;
  }
}
