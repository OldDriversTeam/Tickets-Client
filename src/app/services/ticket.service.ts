import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service'

@Injectable()
export class TicketService {

  constructor(public http: Http,
              public apiService: ApiService) { }

  public buyTicket(reqData) {
    console.log(reqData);
  	// let url = 'src/mock-data/showing-list.json';
  	let url = this.apiService.apiUrl.buyTickets;
    return this.http
               .post(url, reqData)
               .map((res:Response) => {
                 let result = res.json();
                 return result;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }
  
  public getMyTickets(userId) {
    let url = this.apiService.apiUrl.myTickets + userId;

    return this.http
               .get(url)
               .map((res:Response) => {
                 let result = res.json();
                 return result;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }

}
