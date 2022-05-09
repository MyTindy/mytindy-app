import { Component, ContentChild, HostBinding } from '@angular/core';
import { IonCheckbox } from '@ionic/angular';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss'],
})
export class CustomCheckboxComponent {
  @ContentChild(IonCheckbox) checkbox: IonCheckbox;

  @HostBinding('class.checkbox-checked') isChecked: boolean;

  ngAfterContentInit() {
    this.isChecked = this.checkbox.checked;

    this.checkbox.ionChange.subscribe((changes) => {
      this.isChecked = changes.detail.checked;
    });
  }
}
