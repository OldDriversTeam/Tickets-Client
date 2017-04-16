import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public user = {
    phone: "",
    password: ""
  }

  constructor(public authService: AuthService,
              public router: Router,
              public toastr: ToastsManager) { }

  ngOnInit() {
  }

  public login() {
    this.authService.login(this.user)
    .subscribe(data => {
      if (data.user.name) {
        this.toastr.success('登陆成功', '系统提示');
        this.router.navigateByUrl("index");
      }
    },
    error => {
      console.log(error);
    })
    // this.toastr.success('登陆成功', '系统提示');
    // this.router.navigateByUrl("movies");
  }

}
