import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  providers: [ValidatorService]
})
export class UserRegisterComponent implements OnInit {

  public userForm: FormGroup;
  public userInfo = {
      name: '',
      phone: '',
      password: ''
    };

  public formErrors;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public validatorService: ValidatorService,
              public router: Router) { }

  ngOnInit() {
    this.formErrors = this.validatorService.getFormErrors();
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      "name": [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]
      ],
      "phone": [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]{11}$")
        ]
      ],
      "password": [
        "",
        [
          Validators.required,
          Validators.minLength(6),
        ]
      ],
      "confirmPassword": [
        "",
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });
    this.userForm.valueChanges
      .subscribe(data => this.validatorService.onValueChanged(this.userForm));
    this.validatorService.onValueChanged(this.userForm);
  }

  Register() {
    if (this.userForm.valid) {
      let that = this;
      this.userInfo.phone = this.userForm.value.phone;
      this.userInfo.name = this.userForm.value.name;
      this.userInfo.password = this.userForm.value.password;
      
      this.authService.register(this.userInfo)
        .subscribe(data => {
          console.log(data);
          if (data.statusCode == 400 && data.errorCode == 402) {
            that.formErrors.formError = "这个手机号码已经被注册";
          } else {
            that.router.navigateByUrl("index");
          }
        },
        error => {
          this.formErrors.formError = error.message;
          console.log(error);
        });
      // this.router.navigateByUrl("movies");
    } else {
      this.formErrors.formError = "存在不合法的输入项，请检查";
    }
  }

}
