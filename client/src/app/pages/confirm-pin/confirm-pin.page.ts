import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { signInWithCustomToken } from 'firebase/auth';

import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm-pin',
  templateUrl: './confirm-pin.page.html',
  styleUrls: ['./confirm-pin.page.scss'],
})
export class ConfirmPinPage {
  otpMessage = 'An OTP is sent to your number. You should receive it in 15 s';
  showOTPInput = false;
  code: number;
  location;
  fullName: string;
  optConfig = {
    inputStyles: {
      width: '40px',
      height: '40px',
      color: 'black',
      background: 'white',
      margin: '40px 8px',
    },
    length: 6,
  };

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private locationService: LocationService,
    private usersService: UsersService
  ) {}

  ionViewDidEnter() {
    this.locationService
      .getUserCoordinates()
      .then((res) => (this.location = res));
  }

  verifyCode() {
    this.authService.enterVerifcationCode(this.code).then((userData) => {
      this.usersService.addUser(userData, this.location);
      this.router.navigate(['/take-photo']);
    });
  }

  async otpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        },
      ],
      buttons: [
        {
          text: 'Enter',
          handler: (res) => {
            this.authService.enterVerifcationCode(res.otp).then((userData) => {
              this.router.navigate(['/tabs/profile']);
            });
          },
        },
      ],
    });
    await alert.present();
  }

  onOtpChange(event) {
    this.code = event;
  }
}
