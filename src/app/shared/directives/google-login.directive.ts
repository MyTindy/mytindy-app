import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Directive({
  selector: '[appGoogleLogin]',
})
export class GoogleLoginDirective {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  @HostListener('click')
  onclick() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((res) => this.router.navigate(['/profile']));
  }
}
