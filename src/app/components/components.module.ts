import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SocialLoginComponent } from './social-login/social-login.component';

import { FormsModule } from '@angular/forms';

const components = [SocialLoginComponent];
const modules = [CommonModule, IonicModule, FormsModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
})
export class ComponentsModule {}
