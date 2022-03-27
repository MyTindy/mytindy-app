import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}

  createUser(userData, location) {
    const {
      uid,
      email,
      displayName: name,
      photoURL,
      phoneNumber: phone,
    } = userData;
    try {
      return this.firestore
        .collection('users')
        .add({ uid, name, phone, email, location, photoURL });
    } catch (error) {
      console.error('User has not been created', error);
    }
  }
}
