import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-pin',
  templateUrl: './confirm-pin.page.html',
  styleUrls: ['./confirm-pin.page.scss'],
})
export class ConfirmPinPage {
  OTPmessage: string =
    'An OTP is sent to your number. You should receive it in 15 s';
  showOTPInput: boolean = false;
  code: number;

  constructor(
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  verifyCode() {
    console.log(this.code);

    this.authService.enterVerifcationCode(this.code).then((userData) => {
      this.showSuccess();
      console.log(userData);
    });
  }

  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      buttons: [
        {
          text: 'Ok',
          handler: (res) => {
            alert.dismiss();
          },
        },
      ],
    });
    alert.present();
  }

  async OtpVerification() {
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
              this.showSuccess();
              console.log(userData);
            });
          },
        },
      ],
    });
    await alert.present();
  }
}
