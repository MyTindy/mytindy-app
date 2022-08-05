import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fullName: string;
  phoneNumber: string;
  fireName = null;

  confirmationResult: firebase.auth.ConfirmationResult;

  constructor(private fireAuth: AngularFireAuth) {}

  get getFullName() {
    return this.fullName;
  }

  public async signInWithPhoneNumber(recaptchaVerifier, phoneNumber) {
    return await this.fireAuth
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        console.log(this.confirmationResult);

        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        return confirmationResult;
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  }

  public async enterVerifcationCode(code) {
    return new Promise<any>((resolve, reject) => {
      this.confirmationResult
        .confirm(code)
        .then(async (result) => {
          const user = result.user;
          resolve(user);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  }

  async storeUsernameAndPhone(fullName) {
    this.fullName = fullName;
  }
}
