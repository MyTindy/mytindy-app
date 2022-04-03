import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  opt = '';
  loading = false;
  serverMessage = '';
  phoneNumber: string;
  formType: 'login' | 'Register' | 'reset' = 'Register';

  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;

  constructor(private authService: AuthService, private router: Router) {}

  get isLogin(): boolean {
    return this.formType === 'login';
  }

  get isSignup(): boolean {
    return this.formType === 'Register';
  }
  changeFormType(value: 'login' | 'Register' | 'reset' = 'Register') {
    this.formType = value;
  }

  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'submit-button',
      {
        size: 'invisible',
        callaback: (res) => {},
        'expired-callback': () => {},
      }
    );
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'submit-button',
      {
        size: 'invisible',
        callaback: (res) => {},
        'expired-callback': () => {},
      }
    );
  }

  onPhoneEmitted($event) {
    this.phoneNumber = $event;
    console.log(this.phoneNumber);
  }

  signinWithPhoneNumber($event) {
    console.log($event);
    try {
      if (this.phoneNumber) {
        this.authService
          .signInWithPhoneNumber(this.recaptchaVerifier, this.phoneNumber)
          .then((success) => {
            console.log('country', this.recaptchaVerifier);
            this.router.navigate(['/confirm']);
          });
      }
    } catch (error) {
      console.error('error', error);
    }
  }
}
