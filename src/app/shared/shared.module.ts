import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleLoginDirective } from './directives/google-login.directive';
import { FacebookLoginDirective } from './directives/facebook-login.directive';
import { FormatFileSizePipe } from './pipes/format-file-size.pipe';
import { DropzoneDirective } from './directives/dropzone.directive';

@NgModule({
  declarations: [
    GoogleLoginDirective,
    FacebookLoginDirective,
    DropzoneDirective,
    FormatFileSizePipe,
  ],
  imports: [CommonModule],
  exports: [
    GoogleLoginDirective,
    FacebookLoginDirective,
    DropzoneDirective,
    FormatFileSizePipe,
  ],
})
export class SharedModule {}
