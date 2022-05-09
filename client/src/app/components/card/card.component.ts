import { Component, OnInit } from '@angular/core';
import { products } from 'src/app/shared/constants/card-component.constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  productsList = products;

  constructor() { }

  ngOnInit() {}

}
