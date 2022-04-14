import { Component } from '@angular/core';
import {
  AlertController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { PasscodeComponent } from 'src/app/components/passcode/passcode.component';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/user.service';
import { PasscodeHelper } from 'src/app/utils/passcode.auth';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.page.html',
  styleUrls: ['./lock.page.scss'],
  providers: [StorageService],
})
export class LockPage {
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
  }

  openLocksScreen() {
    this.storageService.get('passcode').then(async (code) => {
      const modal = await this.modalController.create({
        component: PasscodeComponent,
        componentProps: {
          passcode: code,
          passcodeLabel: 'UnLock App',
          onWrong: async (attempts) => {
            let toast = await this.toastCtrl.create({
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
          let toast = await this.toastCtrl.create({
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
    let inputAlert = await this.alertCtrl.create({
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
