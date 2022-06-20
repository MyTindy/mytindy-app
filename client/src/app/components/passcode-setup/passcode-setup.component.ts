import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';

import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/user.service';
import { PasscodeHelper } from 'src/app/utils/passcode.auth';
import { PasscodeComponent } from '../passcode-panel/passcode.component';

@Component({
  selector: 'app-passcode-setup',
  templateUrl: './passcode-setup.component.html',
  styleUrls: ['./passcode-setup.component.scss'],
})
export class PasscodeSetupComponent {
  passcode: string;

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public modalController: ModalController,
    private platform: Platform,
    private storageService: StorageService,
    private usersService: UsersService
  ) {
    this.platform.ready().then(() => {
      this.storageService.get('passcode').then((code) => {
        if (!code) {
          this.setupCode();
        }
      });
    });
  }

  ionViewWillEnter() {
    this.storageService.init();
    console.log('initing ');
  }

  openLocksScreen() {
    console.log(this.storageService.get('passcode'));

    this.storageService.get('passcode').then(async (code) => {
      const modal = await this.modalController.create({
        component: PasscodeComponent,
        componentProps: {
          passcode: code,
          passcodeLabel: 'UnLock App',
          onWrong: async (attempts) => {
            const toast = await this.toastCtrl.create({
              message: `${attempts} wrong possible attempts`,
              duration: 2000,
              color: 'danger',
            });
            toast.present();
          },
        },
      });

      modal.onDidDismiss().then(async () => {
        (async () => {
          const toast = await this.toastCtrl.create({
            message: 'App unlocked',
            duration: 1500,
            color: 'success',
          });
          await toast.present();
        })().catch((err) => {
          console.error(err);
        });
      });
      return await modal.present();
    });
  }

  async setupCode() {
    const inputAlert = await this.alertCtrl.create({
      header: 'Secure your app',
      message: 'Please set your passcode for your App',
      inputs: [{ name: 'code' }],
      buttons: [
        {
          text: 'Set Code',
          handler: async (data) => {
            if (data.code.length < 6) {
              return false;
            } else {
              this.storageService.set('passcode', data.code);
              this.passcode = await PasscodeHelper.hashPasscode(data.code);

              await this.usersService.addUserPasscode(this.passcode);
              return true;
            }
          },
        },
      ],
    });

    inputAlert.present();
  }
}
