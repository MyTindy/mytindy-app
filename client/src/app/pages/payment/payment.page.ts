import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  selectedValue = 1;
  public chosenDeparture: any;
  dept = ''; dest = '';

  cities = ['Warsaw','Paris','New York'];
  opts = [
    { key: 'Warsaw', value: ['paris,new york'] },
    { key: 'Paris', value: ['warsaw,new york'] },
    { key: 'New York', value: ['warsaw,paris,'] }
  ];

  data = [
    {
      id: 1,
      name: 'name1'
    },
    {
      id: 2,
      name: 'name2'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    console.log(event.target.value);
  }

}
