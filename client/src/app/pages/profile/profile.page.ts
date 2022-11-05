import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastService } from 'src/app/services/toast.service';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInfo = null;
  localPhoto = null;
  userData = {};

  categories = [];

  constructor(
    private userService: UsersService,
    public afAuth: AngularFireAuth,
    private toastService: ToastService,
    public photoService: PhotoService
  ) {}

  async ngOnInit() {
    this.userData = this.userService.user;

    this.localPhoto = await (
      await this.photoService.loadSavedPhotos()
    )?.valueOf();

    this.afAuth.currentUser.then((res) => {
      if (res.providerData[0]?.photoURL) {
        this.userInfo = {
          uid: res.uid,
          username: res.displayName,
          photo: res.providerData[0].photoURL,
        };
      } else {
        this.userInfo = {
          uid: res.uid,
          username: res.displayName ?? localStorage.getItem('fullName'),
          photo: this.localPhoto ?? localStorage.getItem('uploadedImage'),
        };
      }
    });

    return this.userInfo;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.toastService.logout();
    });
  }
}
