import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service'

@Injectable()
export class AuthService {
  public thisUser = {
      "id": "1",
      "name": "zhudui",
      "gender": "MALE",
      "age": 20,
      "phone": 11111111111,
      "email": "11@qq.com",
      "password": "qweqwe"
    };
  public currentUser: Subject<any> = new Subject();

  constructor(public http:Http,
              public apiService:ApiService) { }

  public getThisUser() {
    return this.thisUser;
  }

  public getCurrentUser() {
    return this.currentUser.asObservable();
  }

  public register(user) {
    let that = this;
    return this.http.post(this.apiService.apiUrl.be_addUser, user).map((response: Response) => {
      let res = response.json();
      that.thisUser = res.user;
      that.currentUser.next(res.user);
      return res;
    })
    .catch(error => {
      return Observable.throw(error);
    });
  }

  public login(user) {
    let that = this;
    return this.http.post(this.apiService.apiUrl.be_login, user).map((response: Response) => {
      let res = response.json();
      that.thisUser = res.user;
      that.currentUser.next(res.user);
      return res;
    })
    .catch(error => {
      return Observable.throw(error);
    });
  }

  public logout() {
    this.thisUser = null;
    this.currentUser.next({});
  }

  public updateUser(user) {
    let that = this;
    return this.http.post(this.apiService.apiUrl.be_updateUser, user).map((response: Response) => {
      let res = response.json();
      that.thisUser = res.user;
      that.currentUser.next(res.user);
      return res;
    })
    .catch(error => {
      return Observable.throw(error);
    });
  }
}
