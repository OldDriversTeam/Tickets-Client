import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [ValidatorService]
})
export class UserProfileComponent implements OnInit {

  public userForm: FormGroup;
  public formErrors;

  private user;
  constructor(public fb: FormBuilder,
              public authService: AuthService,
              public validatorService: ValidatorService,
              public router: Router,
              public toastr: ToastsManager) { }

  ngOnInit() {
    this.user = this.authService.thisUser;
    this.formErrors = this.validatorService.getFormErrors();
    console.log(this.user)
    this.buildForm();
  }

  private buildForm() {
    this.userForm = this.fb.group({
      "name": [
        this.user.name,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]
      ],
      "gender": [
        "MALE",
        []
      ],
      "phone": [
        {value: this.user.phone, disabled: true},
        [
          Validators.required,
          Validators.pattern("^[0-9]{11}$")
        ]
      ],
      "age": [
        this.user.age,
        [
          Validators.pattern("^[1-9][0-9]*$")
        ]
      ],
      "email": [
        this.user.email,
        [
          Validators.pattern("^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$")
        ]
      ]
    });
    this.userForm.valueChanges
      .subscribe(data => this.validatorService.onValueChanged(this.userForm));
    this.validatorService.onValueChanged(this.userForm);
  }

  public updateUser() {
    this.user.name = this.userForm.value.name;
    this.user.gender = this.userForm.value.gender;
    this.user.age = this.userForm.value.age;
    this.user.email = this.userForm.value.email;
    let that = this;
    
    this.authService.updateUser(this.user)
        .subscribe(data => {
          console.log(data);
          this.toastr.success('修改成功', '系统提示');
        },
        error => {
          this.formErrors.formError = error.message;
          console.log(error);
        });
  }

}
