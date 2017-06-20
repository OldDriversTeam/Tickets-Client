import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  public apiUrl;
  private baseUrl = "http://172.18.71.226:8080";
  // private baseUrl = "http://211.159.183.245:8080/tickets";
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
    this.apiUrl.addUser = this.baseUrl + '/api/users/register';
    this.apiUrl.updateUser = this.baseUrl + '/api/users/update';
    this.apiUrl.cinemaList = this.baseUrl + '/api/showings/movie/';
    this.apiUrl.userData = this.baseUrl + '/api/users/';
    this.apiUrl.showingList = this.baseUrl + '/api/showings/';
    this.apiUrl.buyTickets = this.baseUrl + '/api/tickets/order';
    this.apiUrl.room = this.baseUrl + '/api/rooms/';
    this.apiUrl.soldSeats = this.baseUrl + '/api/tickets/showing/';
    this.apiUrl.myTickets = this.baseUrl + '/api/tickets/user/';
    this.apiUrl.coverList = this.baseUrl + '/api/movies/cover';
  }

}
