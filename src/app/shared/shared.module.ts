import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleLoginDirective } from './directives/google-login.directive';

@NgModule({
  declarations: [GoogleLoginDirective],
  imports: [CommonModule],
  exports: [GoogleLoginDirective],
})
export class SharedModule {}
