import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userInfo: any;
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  createUser(userData, location) {
    const { uid, phoneNumber, displayName, email } = userData;
    return this.firestore
      .collection('users')
      .add({ uid, phone: phoneNumber, name: displayName, email, location });
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
}
