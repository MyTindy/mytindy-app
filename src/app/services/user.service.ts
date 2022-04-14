import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userID: string;
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async createUser(userData, location) {
    try {
      const {
        uid,
        email,
        displayName: name,
        photoURL,
        phoneNumber: phone,
      } = userData;
      const { id: userId } = await this.firestore
        .collection('users')
        .add({ uid, name, phone, email, location, photoURL, passcode: null });
      this.userID = userId;
      localStorage.setItem('userId', this.userID);
      return userId;
    } catch (error) {
      console.error('User has not been created', error);
    }
  }

  async addUserPasscode(code) {
    console.log(code);

    try {
      return this.firestore
        .collection('users')
        .doc(this.userID)
        .update({ passcode: code });
    } catch (error) {
      console.error('passcode has not been updated', error);
    }
  }

  getUserPasscode() {
    this.userID = this.userID ? this.userID : localStorage.getItem('userId');
    return this.firestore.collection('users').doc(this.userID).get();
  }
}
