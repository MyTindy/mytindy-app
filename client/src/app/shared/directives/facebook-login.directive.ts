import { Directive, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { LocationService } from 'src/app/services/location.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/user.service';

@Directive({
  selector: '[appFacebookLogin]',
})
export class FacebookLoginDirective {
  userInfo;
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private locationService: LocationService,
    private usersService: UsersService,
    private toastService: ToastService
  ) {}

  @HostListener('click')
  onclick() {
    this.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((userRes) => {
        if (userRes.additionalUserInfo.isNewUser) {
          this.locationService
            .getUserCoordinates()
            .then((locationRes) =>
              this.usersService.addUser(userRes.user, locationRes)
            );
        }
        this.router.navigate(['/take-photo']);
      })
      .catch((err) =>
        err.code === 'auth/popup-closed-by-user'
          ? this.toastService.closedPopup()
          : console.log(err)
      );
  }
}
