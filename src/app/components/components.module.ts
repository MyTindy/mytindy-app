import { SearchComponent } from './search/search.component';
import { CardComponent } from './card/card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SocialLoginComponent } from './social-login/social-login.component';
import { PhoneComponent } from './phone/phone.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PasscodeComponent } from './passcode/passcode.component';
import { PasscodeHelper } from '../utils/passcode.auth';
import { UploaderComponent } from './uploader/uploader.component';
import { CollectionsComponent } from './collections/collections.component';
import { CustomCheckboxComponent } from './custom-checkbox/custom-checkbox.component';

const components = [
  SocialLoginComponent,
  PhoneComponent,
  PasscodeComponent,
  UploaderComponent,
  SearchComponent,
  CardComponent,
  CollectionsComponent,
  CustomCheckboxComponent,
];
const modules = [CommonModule, IonicModule, FormsModule, SharedModule];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...components, ...modules],
  providers: [PasscodeHelper],
})
export class ComponentsModule {}
