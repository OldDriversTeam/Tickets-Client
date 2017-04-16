import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {
  private formErrors = {
    'name': '',
    'age': '',
    'phone': '',
    'email': '',
    'password': '',
    'confirmPassword': '',
    'formError': ''
  };

  private validationMessages = {
    'name': {
      'required': '用户名必须输入。',
      'minlength': '用户名4到32个字符。'
    },
    'age': {
      'pattern': '请输入数字'
    },
    'phone': {
      'required': '手机号码必须输入。',
      'pattern': '请输入正确的手机号码（手机号码应为11位数字）。'
    },
    'email': {
      'pattern': '请输入正确的邮箱地址。'
    },
    'password': {
      'required': '密码必须输入。',
      'minlength': '密码至少要6位。'
    },
    'confirmPassword': {
      'required': '重复密码必须输入。',
      'minlength': '密码至少要6位。',
      'validateEqual': "两次输入的密码不一致。"
    }
  };

  constructor() { }

  public getFormErrors() {
    return this.formErrors;
  }

  public getValidationMessages() {
    return this.validationMessages;
  }

  public onValueChanged(userForm) {
    if (!userForm) {
      return;
    }
    const form = userForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
