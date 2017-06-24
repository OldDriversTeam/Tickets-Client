import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service'

@Injectable()
export class MovieService {

  public selectedMovie = {
    name: null,
    movieType: null,
    poster: null
  }

  constructor(public http:Http,
              public apiService:ApiService) { }

  public getMovieList() {
    let url = this.apiService.apiUrl.movies;
    return this.http
               .get(url)
               .map((res:Response) => {
                 let result = res.json();
                 return result.movieList;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getMovieById(id) {
    let url = this.apiService.apiUrl.movieById + id;
    return this.http
               .get(url)
               .map((res:Response) => {
                 let result = res.json();
                 return result;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }

  public getMovieCoverList() {
    let url = this.apiService.apiUrl.coverList;
    return this.http
               .get(url)
               .map((res:Response) => {
                 let result = res.json();
                 return result;
               })
               .catch((error:any) => Observable.throw(error || 'Server error'));
  }
}
