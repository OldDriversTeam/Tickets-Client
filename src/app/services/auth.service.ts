import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, Response, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service'

@Injectable()
export class AuthService {
  public thisUser = {
      "id": null,
      "name": null,
      "gender": null,
      "age": null,
      "phone": null,
      "email": null,
      "password": null
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
    return this.http.post(this.apiService.apiUrl.addUser, user).map((response: Response) => {
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
    console.log(user);
    return this.http.post(this.apiService.apiUrl.login, user).map((response: Response) => {
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
    return this.http.post(this.apiService.apiUrl.updateUser, user).map((response: Response) => {
      let res = response.json();
      console.log("res", res);
      that.thisUser = user;
      that.currentUser.next(user);
      return res;
    })
    .catch(error => {
      return Observable.throw(error);
    });
  }

  public isLogin() {
    return this.thisUser.id ? true : false;
  }
}
