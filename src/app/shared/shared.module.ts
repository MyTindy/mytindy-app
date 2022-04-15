import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleLoginDirective } from './directives/google-login.directive';
import { FacebookLoginDirective } from './directives/facebook-login.directive';
import { FormatFileSizePipe } from './pipes/format-file-size.pipe';

@NgModule({
  declarations: [
    GoogleLoginDirective,
    FacebookLoginDirective,
    FormatFileSizePipe,
  ],
  imports: [CommonModule],
  exports: [GoogleLoginDirective, FacebookLoginDirective, FormatFileSizePipe],
})
export class SharedModule {}
