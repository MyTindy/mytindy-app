import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SocialLoginComponent } from './social-login/social-login.component';

import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

const components = [SocialLoginComponent];
const modules = [CommonModule, IonicModule, FormsModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class ComponentsModule {}
