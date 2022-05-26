import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { products } from 'src/app/shared/constants/card-component.constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges{
  @Input() searchProduct: string;
  productsList;
filtredList = [];
  constructor() {}

ngOnChanges(changes: SimpleChanges) {
  console.log(changes.searchProduct.currentValue);
  if(!this.searchProduct.trim()){
this.productsList = products;
  }else{
    this.productsList = this.onSearchProduct(products);
  }
}
onSearchProduct(productsArr){
return productsArr.filter(product => product.name.toLowerCase().includes(this.searchProduct.trim().toLowerCase()));
}
onDeleteCard(productIndex){
console.log(productIndex);
this.productsList.splice(productIndex,1);
}

}
