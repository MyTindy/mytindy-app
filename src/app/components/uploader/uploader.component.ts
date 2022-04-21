import { Component, Input, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  @Input() file: File;

  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  percentage: Observable<number>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage) {}

  ngOnInit(): void {
    this.uploadImage();
  }

  uploadImage() {
    const path = `productImages/${Date.now()}_${this.file?.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURL = await ref
          ?.getDownloadURL()
          ?.toPromise()
          .catch((err) => {
            if (err.message.includes('not exist')) {
              console.log('"""File not found"""');
            }
          });
      })
    );
  }

  isActive(snapshot) {
    return (
      snapshot.state === 'running' &&
      snapshot.bytesTransferred < snapshot.totalBytes
    );
  }
}
