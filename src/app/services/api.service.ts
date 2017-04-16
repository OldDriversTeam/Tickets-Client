import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  public apiUrl;
  private baseUrl = "http://172.18.71.226:8080/tickets";
  constructor() {
    this.apiUrl = {};
    this.apiUrl.be_movies = this.baseUrl + '/api/movies';
    this.apiUrl.be_login = this.baseUrl + '/api/users/login';
    this.apiUrl.be_addUser = this.baseUrl + '/api/users/add';
    this.apiUrl.be_updateUser = this.baseUrl + '/api/users/update';
  }

}
