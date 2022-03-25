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

  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }
}
