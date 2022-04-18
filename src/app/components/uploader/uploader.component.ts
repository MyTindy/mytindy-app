import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  constructor(
    private storage: AngularFireStorage,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.uploadImage();
  }

  uploadImage() {
    const path = `profileImages/${Date.now()}_${this.file?.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.usersService.updateUserPhoto(this.downloadURL);
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
