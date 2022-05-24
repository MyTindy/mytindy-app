import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { PasscodeHelper } from 'src/app/utils/passcode.auth';

@Component({
  selector: 'app-lock-component',
  templateUrl: './passcode.component.html',
  styleUrls: ['./passcode.component.scss'],
})
export class PasscodeComponent {
  _showLockScreen: boolean = true;
  ACDelbuttons: boolean = true;
  passcodeWrong: boolean;
  passcodeAttempts: number = 0;
  enteredPasscode: string = '';
  passcode: string;
  passcodeLabel: string = 'Enter Passcode';
  onWrong: any = null;
  selected: any;

  constructor(
    public modalController: ModalController,
    private toastCtrl: ToastController,
    private passcodeHelper: PasscodeHelper
  ) {}

  allClear(): void {
    this.enteredPasscode = '';
  }

  remove(): void {
    this.enteredPasscode = this.enteredPasscode.slice(0, -1);
  }

  async onDidDismiss() {
    let toast = await this.toastCtrl.create({
      message: 'App unlocked',
      duration: 4000,
      cssClass: 'toast-custom-class',
    });
    toast.present();
  }

  async digit(digit: any): Promise<void> {
    this.selected = +digit;
    if (this.passcodeWrong) {
      return;
    }
    this.enteredPasscode += '' + digit;

    if (this.enteredPasscode.length >= 6) {
      const res = await this.passcodeHelper.comparePasscodes(
        this.enteredPasscode
      );

      if (res) {
        this.enteredPasscode = '';
        this.passcodeAttempts = 0;
        this._showLockScreen = false;
        this.modalController.dismiss();
      } else {
        console.log('entered', this.enteredPasscode);
        this.passcodeWrong = true;
        this.passcodeAttempts++;
        this.onWrong && this.onWrong(this.passcodeAttempts);
        setTimeout(() => {
          this.enteredPasscode = '';
          this.passcodeWrong = false;
        }, 800);
      }
    }
  }
}
