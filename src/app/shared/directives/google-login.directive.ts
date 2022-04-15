import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { LocationService } from 'src/app/services/location.service';
import { UsersService } from 'src/app/services/user.service';

@Directive({
  selector: '[appGoogleLogin]',
})
export class GoogleLoginDirective {
  userInfo;
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private locationService: LocationService,
    private usersService: UsersService
  ) {}

  @HostListener('click')
  onclick() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userRes) => {
        if (userRes.additionalUserInfo.isNewUser) {
          this.locationService
            .getUserCoordinates()
            .then((locationRes) =>
              this.usersService.createUser(userRes.user, locationRes)
            );
        }
        this.router.navigate(['/take-photo']);
      });
  }
}
