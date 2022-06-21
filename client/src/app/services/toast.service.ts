import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastCtrl: ToastController, private router: Router) {}

  async authError() {
    this.toastCtrl
      .create({
        message: 'Oops, you must be logged in to view this page!',
        duration: 5000,
        position: 'bottom',
        cssClass: 'toast-custom-class',
      })
      .then((toastData) => {
        this.router.navigate(['/login']);
        toastData.present();
      });
  }

  async closedPopup() {
    this.toastCtrl
      .create({
        message: 'Why would you close that popup, WHY? Please try again',
        duration: 5000,
        position: 'top',
        cssClass: 'toast-custom-class',
      })
      .then((toastData) => {
        toastData.present();
      });
  }
}
