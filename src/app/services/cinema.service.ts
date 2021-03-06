import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service'

@Injectable()
export class CinemaService {

  constructor(public http:Http,
              public apiService:ApiService) { }

  public getCinemaList(movieId) {
    // let url = 'src/mock-data/cinema-list.json';
    let url = this.apiService.apiUrl.cinemaList + movieId;
    return this.http
               .get(url)
               .map((res:Response) => {
                 let result = res.json();
                 return result;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }

}