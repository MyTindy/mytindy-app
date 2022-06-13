import { AngularFirestore } from '@angular/fire/compat/firestore';
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  photo =
    'https://image.shutterstock.com/image-photo/pottery-artisan-making-fireclay-jugs-260nw-599795654.jpg';

  data: any = {
    username: '',
    name: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    sms: false,
    addPasscode: false,
  };

  uid: string = '';

  constructor(private auth: AngularFireAuth, private store: AngularFirestore) {
    // for check if user is Auth
    this.auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        let { uid } = user;
        console.log(uid);
        this.uid = uid;
        this.getInfouser();
      } else {
        console.log(' no auth');
      }
    });

    // for logout user
    // this.auth.signOut();
  }
  ngOnInit() {}

  async getInfouser() {
    console.log('get doc');
    this.store
      .collection('users')
      .doc(this.uid)
      .get()
      .subscribe((res) => {
        console.log(res.data());
        this.data = res.data();
      });
  }

  saveProfile(form: any) {
    console.log(form.value);

    this.store
      .collection('users')
      .doc(this.uid)
      .update(form.value)
      // .set(form.value)
      .then(() => {
        console.log('saved data');
      });
  }

  openOptionSelection() {
    console.log('hello world');
  }
}
