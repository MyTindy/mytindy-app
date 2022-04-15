import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  fileUploadTask: AngularFireUploadTask; // File upload task
  percentageVal: Observable<number>; // Upload progress
  trackSnapshot: Observable<any>; // Track file uploading with snapshot
  UploadedImageURL: Observable<string>; // Uploaded File URL
  files: Observable<imgFile[]>; // Uploaded image collection
  // Image specifications
  imgName: string;
  imgSize: number;
  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private filesCollection: AngularFirestoreCollection<imgFile>;

  constructor(
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {
    this.isFileUploaded = false;
    this.isFileUploading = false;
    this.filesCollection = firestore.collection<imgFile>('imagesColleciton');
    this.files = this.filesCollection.valueChanges();
  }

  uploadImage(event: FileList) {
    const file = event.item(0);
    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported');
      return;
    }
    console.log(event);

    this.isFileUploading = true;
    this.isFileUploaded = false;
    this.imgName = file.name;
    // Stoage path
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);
    // Show uploading progress
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);

    this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      finalize(async () => {
        // Retreive uploaded image storage path
        this.UploadedImageURL = await imageRef.getDownloadURL();

        await this.UploadedImageURL.subscribe(
          async (resp) => {
            await this.storePhotosFirebase({
              name: file.name,
              filepath: resp,
              size: this.imgSize,
            });
            this.isFileUploading = false;
            this.isFileUploaded = true;
          },
          (error) => {
            console.log('finalize', error);
          }
        );
      }),
      tap((snap) => {
        this.imgSize = snap.totalBytes;
      })
    );
  }

  storePhotosFirebase(image: imgFile) {
    const fileID = this.firestore.createId();
    console.log({ fileID });
    console.log({ image });

    this.filesCollection
      .doc(fileID)
      .set(image)
      .then((res) => console.log({ res }))
      .catch((err) => console.error({ err }));
  }
}
