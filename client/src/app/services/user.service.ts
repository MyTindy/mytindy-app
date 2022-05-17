import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SellerInput, SellerOutput } from '../models/seller.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userID: string;
  userInfo: any;
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private http: HttpClient
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

      localStorage.setItem('userId', (this.userID = userId));
      return userId;
    } catch (error) {
      console.error('User has not been created', error);
    }
  }

  addUserPasscode(code) {
    try {
      return this.firestore
        .collection('users')
        .doc(this.userID)
        .update({ passcode: code });
    } catch (error) {
      console.error('passcode has not been updated', error);
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

  getUserPasscode() {
    this.userID = this.userID ? this.userID : localStorage.getItem('userId');
    return this.firestore.collection('users').doc(this.userID).get();
  }

  updateUser(userdata) {
    return this.firestore
      .collection('users')
      .doc(userdata.uid)
      .update({ userdata });
  }

  updateUserPhoto(url) {
    this.userID = this.userID ? this.userID : localStorage.getItem('userId');

    return this.firestore
      .collection('users')
      .doc(this.userID)
      .update({ photoURL: url });
  }

  deleteUser(id) {
    return this.firestore.collection('users').doc(id).delete();
  }

  createSellers(info: SellerInput) {
    return this.http
      .post<SellerInput>('/api/sellers', info)
      .pipe(tap((res) => console.log({ res })));
  }

  getSellers() {
    return this.http
      .get<SellerOutput[]>('/api/sellers')
      .pipe(tap((res) => console.log({ res })));
  }

  getSeller(id: number) {
    return this.http
      .get<SellerInput>(`/api/sellers/${id}`)
      .pipe(tap((res) => console.log({ res })));
  }

  updateSeller(id, info: SellerInput): Observable<SellerInput> {
    return this.http
      .put<SellerInput>(`/api/sellers/${id}`, info)
      .pipe(tap((res) => console.log({ res })));
  }

  deleteSeller(id: number) {
    return this.http.delete(`/api/sellers/${id}`);
  }
}
