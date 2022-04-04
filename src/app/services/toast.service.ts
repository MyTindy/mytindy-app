import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastCtrl: ToastController, private router: Router) {}

  async authError() {
    const toast = this.toastCtrl
      .create({
        message: 'you must be logged in to view this page',
        duration: 3000,
        position: 'bottom',
        cssClass: 'toast-custom-class',
      })
      .then((toastData) => {
        console.log(toastData);
        toastData.present();
        this.router.navigate(['/login']);
      });
  }
}
