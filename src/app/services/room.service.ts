import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service'

@Injectable()
export class RoomService {

  public roomData = {
    showingId: null,
  	cinemaName: null,
    roomId: null,
  	roomName: null,
  	time: null,
  	seats: [],
  	price: null,
  	totalPrice: null
  }

  constructor(public http: Http,
              public apiService: ApiService) { }

  public setRoomData(data) {
  	this.roomData = data;
  }

  public getRoomData(data) {
  	return this.roomData;
  }

  public loadSeatInfo(roomId) {
    let url = this.apiService.apiUrl.room + roomId;

    return this.http
               .get(url)
               .map((res:Response) => {
                 let result = res.json();
                 return result;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
