import { Component, Optional } from '@angular/core';
import { Auth, GoogleAuthProvider } from '@angular/fire/auth';
import { signInWithPopup } from '@firebase/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular/';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})
export class SocialLoginComponent {
  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    public loadingController: LoadingController
  ) {}

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      await this.router.navigate(['/profile']);
    } catch (error) {
      console.error(error);
    }
  }
}
