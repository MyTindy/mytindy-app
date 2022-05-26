import { Component, OnInit } from '@angular/core';
import { products } from 'src/app/shared/constants/card-component.constants';
import { ModalController } from '@ionic/angular';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  productsList = products;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  async openModal(){
const modal = await this.modalCtrl.create({
  component: EditModalComponent
});
await modal.present();
  }

}
