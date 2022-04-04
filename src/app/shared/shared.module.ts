import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleLoginDirective } from './directives/google-login.directive';
import { FacebookLoginDirective } from './directives/facebook-login.directive';

@NgModule({
  declarations: [GoogleLoginDirective,FacebookLoginDirective],
  imports: [CommonModule],
  exports: [GoogleLoginDirective,FacebookLoginDirective],
})
export class SharedModule {}
