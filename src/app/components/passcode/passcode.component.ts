import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TouchID } from '@awesome-cordova-plugins/touch-id/ngx';

@Component({
  selector: 'app-lock-component',
  templateUrl: './passcode.component.html',
  styleUrls: ['./passcode.component.scss'],
  providers: [TouchID],
})
export class PasscodeComponent {
  _showLockScreen: boolean = true;
  ACDelbuttons: boolean = true;
  passcodeWrong: boolean;
  passcodeAttempts: number = 0;
  enteredPasscode: string = '';
  passcode: string;
  passcodeLabel: string = 'Enter Passcode';
  touchLabel: string = 'Verify Passcode';
  onWrong: any = null;
  selected: any;

  constructor(
    public modalController: ModalController,
    private toastCtrl: ToastController,
    private touchId: TouchID
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (this.touchId) {
        this.touchId.isAvailable().then(
          (res) => {
            this.touchId.verifyFingerprint(this.passcodeLabel).then(
              (res) => {
                this._showLockScreen = false;
                console.log('successfuly logged'); //TODO: add toaster
              },
              (err) => {
                console.log(
                  'Unable to unlock the device with this fingerprint.'
                );
              }
            );
          },
          (err) => {
            console.log('Touch ID is not available.');
          }
        );
      }
    }, 50);
  }
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

  digit(digit: any): void {
    this.selected = +digit;
    if (this.passcodeWrong) {
      return;
    }
    this.enteredPasscode += '' + digit;

    if (this.enteredPasscode.length >= 6) {
      if (this.enteredPasscode === '' + this.passcode) {
        this.enteredPasscode = '';
        this.passcodeAttempts = 0;
        this._showLockScreen = false;
        this.modalController.dismiss();
      } else {
        console.log('entered', this.enteredPasscode);
        console.log(this.passcode);

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
