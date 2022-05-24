import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakePhotoPageRoutingModule } from './take-photo-routing.module';

import { TakePhotoPage } from './take-photo.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakePhotoPageRoutingModule,
    SharedModule,
    ComponentsModule,
  ],
  declarations: [TakePhotoPage],
})
export class TakePhotoPageModule {}
