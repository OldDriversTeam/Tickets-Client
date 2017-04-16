import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MovieService {

  constructor(public http:Http,
              public apiService:ApiService) { }

  public getMovieList() {
    let url = this.apiService.apiUrl.be_movies;
    // let url = 'src/mock-data/movieList-mock.json';
    return this.http
               .get(url)
               .map((res:Response) => {
                 let result = res.json();
                 return result;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
