import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';

import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsersService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  fileUploadTask: AngularFireUploadTask; // File upload task

  constructor(
    private afStorage: AngularFireStorage,
    private usersService: UsersService
  ) {}

  async uploadImage(image) {
    const fileStoragePath = `filesStorage/${new Date().getTime()}`;

    const imageRef = this.afStorage.ref(fileStoragePath);

    this.fileUploadTask = this.afStorage.upload(fileStoragePath, image);

    this.fileUploadTask
      .snapshotChanges()
      .pipe(
        switchMap((snapshot) => {
          if ('success' !== snapshot.state) {
            return of();
          }
          return imageRef.getDownloadURL();
        })
      )
      .subscribe((downloadURL) =>
        this.usersService.updateUserPhoto(downloadURL)
      );
  }
}
