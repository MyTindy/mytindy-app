import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CountryJson } from 'src/app/shared/constants/country-code.constant';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent {
  countryJson: any = CountryJson;
  CountryCode: string = '+91';
  PhoneNo: number;

  constructor() {}
  @Output() phoneNumber = new EventEmitter<string>();

  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }

  countryCodeWithPhoneNoChange() {
    this.phoneNumber.emit(this.CountryCode + '' + this.PhoneNo);
  }
}
