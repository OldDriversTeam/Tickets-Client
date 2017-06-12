import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service'

@Injectable()
export class ShowingService {

  constructor(public http:Http,
              public apiService:ApiService) { }

  public getShowingList(reqData) {
  	let url = 'src/mock-data/showing-list.json';
  	// let url = this.apiService.apiUrl.showingList + 'cinema/' + reqData.cinemaId + '/date/' + reqData.date + '/movie/' + reqData.movieId;
    return this.http
               .get(url)
               .map((res:Response) => {
                 let result = res.json();
                 return result;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
