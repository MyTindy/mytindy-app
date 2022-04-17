import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userID: string;
  userInfo: any;
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async addUser(userData, location) {
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

  getUserById() {
    try {
      return this.afAuth.authState.pipe(
        switchMap((user) => {
          if (user) {
            return this.firestore
              .collection<any>('users', (ref) =>
                ref.where('uid', '==', user.uid)
              )
              .valueChanges({ idField: 'id' });
          } else {
            return [];
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  updateUser(userdata) {
    return this.firestore
      .collection('users')
      .doc(userdata.uid)
      .update({ userdata });
  }

  deleteUser(id) {
    return this.firestore.collection('users').doc(id).delete();
  }

  async addUserPasscode(code) {
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
