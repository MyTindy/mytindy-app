import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss'],
})
export class EditModalComponent {
  photo = 'https://image.shutterstock.com/image-photo/pottery-artisan-making-fireclay-jugs-260nw-599795654.jpg';

  constructor( private modalCrtl: ModalController) { }
  dismissModal(){
    this.modalCrtl.dismiss();
  }

}
