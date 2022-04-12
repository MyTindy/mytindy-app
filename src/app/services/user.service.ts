import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, docData, Firestore , doc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection,addDoc, deleteDoc, updateDoc } from 'firebase/firestore';

export interface UsersData {
  name?: string;
  code?: number;
  photoURL?: string;
  phoneNumber?: string;
  location?: any;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}

  getUsers(): Observable<UsersData[]> {
    const userRef = collection(this.firestore , 'users');
    return collectionData(userRef, {idField: 'id'}) as  Observable<UsersData[]>;
  }

  getUserById(id): Observable<UsersData[]>{
    const userDocRef = doc(this.firestore, 'users/${id}');
    return docData(userDocRef, {idField: 'id'}) as  Observable<UsersData[]>;
  }
  addUser(userdata: UsersData, location){
    console.log(userdata);
    console.log(location);
    const userRef = collection(this.firestore, 'users');
    console.log(userRef);
    return addDoc(userRef, userdata);
  }
  deleteUser(userdata: UsersData){
    const userDocRef = doc(this.firestore, 'users/${usersData.id}');
    return deleteDoc(userDocRef);
  }
 updateUser(userdata: UsersData){
    const userDocRef = doc(this.firestore, 'users/${usersData.id}');
    return updateDoc(userDocRef,{ name: userdata.name,
      code: userdata.code,
      photoURL: userdata.photoURL,
      phoneNumber: userdata.phoneNumber, location:userdata.location});
  }


}
// try {
//   return this.firestore
//     .collection('users')
//     .add({ uid, name, phone, email, location, photoURL });
// } catch (error) {
//   console.error('User has not been created', error);
// }
