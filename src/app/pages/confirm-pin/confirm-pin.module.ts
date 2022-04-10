import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmPinPageRoutingModule } from './confirm-pin-routing.module';
import { NgOtpInputModule } from  'ng-otp-input';


import { ConfirmPinPage } from './confirm-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmPinPageRoutingModule,NgOtpInputModule
  ],
  declarations: [ConfirmPinPage],
})
export class ConfirmPinPageModule {}
