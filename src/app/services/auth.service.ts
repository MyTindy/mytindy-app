import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  confirmationResult: firebase.auth.ConfirmationResult;

  constructor(private fireAuth: AngularFireAuth) {}

  public signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
    console.log('test', recaptchaVerifier);

    return new Promise<any>((resolve, reject) => {
      this.fireAuth
        .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          this.confirmationResult = confirmationResult;
          console.log(this.confirmationResult);

          resolve(confirmationResult);
        })
        .catch((error) => {
          console.error(error);
          reject('SMS not sent');
        });
    });
  }

  public async enterVerifcationCode(code) {
    console.log(code);

    return new Promise<any>((resolve, reject) => {
      this.confirmationResult
        .confirm(code)
        .then(async (result) => {
          console.log(result);
          const user = result.user;
          resolve(user);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }
}
