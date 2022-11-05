import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

import { ActionSheetController } from '@ionic/angular';
import { UserPhoto } from 'src/app/models/photo.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-take-photo',
  templateUrl: './take-photo.page.html',
  styleUrls: ['./take-photo.page.scss'],
})
export class TakePhotoPage implements OnInit {
  fullName: string;

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    public uploadService: UploadService
  ) {}

  async ngOnInit() {
    await this.photoService.loadSavedPhotos();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async uploadImage(image: any) {
    const response = await fetch(image.webviewPath!);
    const blob = await response.blob();
    localStorage.setItem('uploadedImage', image.webviewPath);
    this.uploadService.uploadImage(blob);
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photo',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.photoService.deletePhoto(photo, position);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  async skipForNow() {
    this.fullName = this.authService.getFullName;
    const profile = {
      displayName: this.fullName,
      photoURL: '',
    };
    return (await this.afAuth.currentUser).updateProfile(profile);
  }
}
