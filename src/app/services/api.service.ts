import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  public apiUrl;
  private baseUrl = "http://172.18.71.226:8080";
  constructor() {
    // this.apiUrl = {};
    // this.apiUrl.be_movies = 'src/mock-data/movie-list.json';
    // this.apiUrl.be_login = 'src/mock-data/users.json';
    // this.apiUrl.be_addUser = 'src/mock-data/users.json';
    // this.apiUrl.be_updateUser = 'src/mock-data/users.json';

    this.apiUrl = {};
    this.apiUrl.movies = this.baseUrl + '/api/movies/onshow';
    this.apiUrl.movieById = this.baseUrl + '/api/movies/';
    this.apiUrl.login = this.baseUrl + '/api/users/login';
    this.apiUrl.addUser = this.baseUrl + '/api/users/add';
    this.apiUrl.updateUser = this.baseUrl + '/api/users/update';
  }

}
