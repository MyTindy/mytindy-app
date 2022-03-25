import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  OPT: string = '';
  phoneNumber: string;

  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;

  constructor() {}

  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callaback: (res) => {},
        'expired-callback': () => {},
      }
    );
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callaback: (res) => {},
        'expired-callback': () => {},
      }
    );
  }

  onPhoneEmitted($event) {
    this.phoneNumber = $event;
  }

  signinWithPhoneNumber($event) {
    try {
      if (this.phoneNumber) {
        console.log(this.phoneNumber);
      }
    } catch (error) {
      console.error('error', error);
    }
  }
}
