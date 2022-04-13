import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}

  // getUsers(usersData){
  //   // const userRef = collection(this.firestore , 'users');
  //   // return collectionData(userRef, {idField: 'id'}) as  Observable<UsersData[]>;
  //   return this.firestore.collection('users').add({ uid, name ,email, code , photoURL , phoneNumber, location });
  // }

    getUserById(uid){
      return this.firestore.collection('users').doc(uid).get({name ,email,phone});
      // const userDocRef = doc(this.firestore, 'users/${id}');
      // return docData(userDocRef, {idField: 'id'}) as  Observable<UsersData[]>;
    }
  addUser(userData, location) {
    console.log(userData);
    console.log(location);

    const { uid, phoneNumber, displayName, email } = userData;
    return this.firestore
      .collection('users')
      .add({ uid, phone: phoneNumber, name: displayName, email, location });
  }

  deleteUser(userdata) {
    // const userDocRef = doc(this.firestore, 'users/${usersData.id}');
    // return deleteDoc(userDocRef);
    return this.firestore.collection('users').doc(userdata.uid).delete();
  }
  updateUser(userdata) {
    return this.firestore
      .collection('users')
      .doc(userdata.uid)
      .update({ userdata });
    // const userDocRef = doc(this.firestore, 'users/${usersData.id}');
    // return updateDoc(userDocRef,{ name: userdata.name,
    //   code: userdata.code,
    //   photoURL: userdata.photoURL,
    //   phoneNumber: userdata.phoneNumber, location:userdata.location});
  }
}
// try {
//   return this.firestore
//     .collection('users')
//     .add({ uid, name, phone, email, location, photoURL });
// } catch (error) {
//   console.error('User has not been created', error);
// }
