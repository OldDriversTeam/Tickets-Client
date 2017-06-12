import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import 'rxjs/add/operator/merge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentUser = null;

  constructor(public authService: AuthService,
              public toastr: ToastsManager,
              public vcr: ViewContainerRef,
              public router: Router) {
                this.toastr.setRootViewContainerRef(vcr);
              }

  ngOnInit() {
    this.authService.getCurrentUser()
      .subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
    });
    // this.currentUser = {
    //   "id": "1",
    //   "name": "zhudui",
    //   "gender": "MALE",
    //   "age": 20,
    //   "phone": 11111111111,
    //   "email": "11@qq.com",
    //   "password": "qweqwe"
    // };
  }

  logout() {
    this.authService.logout();
    this.toastr.success('退出成功', '系统提示');
    this.router.navigateByUrl("index");
    console.log("haha")
  }
}
