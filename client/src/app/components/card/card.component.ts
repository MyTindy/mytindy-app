import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { products } from 'src/app/shared/constants/card-component.constants';
import { ModalController } from '@ionic/angular';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnChanges{
  @Input() searchProduct: string;
  productsList;
filtredList = [];

constructor(private modalCtrl: ModalController) { }

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

  async openModal(){
const modal = await this.modalCtrl.create({
  component: EditModalComponent
});
await modal.present();
  }

}
