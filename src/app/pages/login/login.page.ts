import { Component } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

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
