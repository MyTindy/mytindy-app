import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  photo =
    'https://image.shutterstock.com/image-photo/pottery-artisan-making-fireclay-jugs-260nw-599795654.jpg';

  userInfoForm: any;
  isToggleBtnChecked = false;

  uid = '';

  constructor(
    private auth: AngularFireAuth,
    private store: AngularFirestore,
    private formBuilder: FormBuilder
  ) {
    // for check if user is Auth
    this.auth.onAuthStateChanged(async (user: any) => {
      if (user) {
        const { uid } = user;
        this.uid = uid;
        this.getInfouser();
      } else {
        console.log(' no auth');
      }
    });
  }
  ngOnInit() {
    this.isToggleBtnChecked = false;
    this.userInfoForm = this.formBuilder.group({
      username: [''],
      name: [''],
      lastName: [''],
      phoneNumber: [''],
      emailAddress: [''],
      sms: false,
      addPasscode: false,
    });
  }

  async getInfouser() {
    this.store
      .collection('users')
      .doc(this.uid)
      .get()
      .subscribe((res) => {
        console.log(res.data());
        this.userInfoForm = res.data();
      });
  }

  saveProfile(form: any) {
    this.store
      .collection('users')
      .doc(this.uid)
      .update(form.value)
      .then(() => {
        console.log('saved data');
      });
  }
  openOptionSelection() {
    console.log('openOptionSelection');
  }
}
