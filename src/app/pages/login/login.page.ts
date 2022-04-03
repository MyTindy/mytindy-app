import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { FormBuilder, FormGroup, Validators,
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  {
  // form: FormGroup;
  opt = '';
  loading=false;
  serverMessage='';
  phoneNumber: string;
  formType: 'log in' | 'Register' | 'reset' = 'Register';

  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;

  constructor(private authService: AuthService, private router: Router) {}

  get isLogin(): boolean {
    return this.formType === 'log in';
  }

  get isSignup(): boolean {
    return this.formType === 'Register';
  }
  // get name(){
  //   return this.form.get('name');
  // }
  // get phone(){
  //   return this.form.get('phone');
  // }

  // ngOnInit(){
  //   this.form =this.fb.group({
  //     name:['',[Validators.required, Validators.name]],
  //     phone:['',[Validators.required]]
  //   });
  // }


  changeFormType(value: 'log in' | 'Register' | 'reset' = 'Register') {
    this.formType = value;
  }

  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'submit-button',
      {
        size: 'invisible',
        callaback: (res) => {},
        'expired-callback': () => {},
      }
    );
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'submit-button',
      {
        size: 'invisible',
        callaback: (res) => {},
        'expired-callback': () => {},
      }
    );
  }

  onPhoneEmitted($event) {
    this.phoneNumber = $event;
    console.log(this.phoneNumber);
  }

  signinWithPhoneNumber($event) {
    console.log($event);
    try {
      if (this.phoneNumber) {
        console.log(this.phoneNumber);
        this.authService
          .signInWithPhoneNumber(this.recaptchaVerifier, this.phoneNumber)
          .then((success) => {
            console.log('country', this.recaptchaVerifier);
            this.router.navigate(['/confirm']);
          });
      }
    } catch (error) {
      console.error('error', error);
    }
  }
// async onSubmit(){
// this.loading = true;
// const name = this.name.value;
// const phone = this.phoneNumber;
// try{
// if (this.isLogin){

// await this.authService.signInWithPhoneNumber(this.recaptchaVerifier,phone);
// }if (this.isSignup){
//   await this.authService.signInWithPhoneNumber(this.recaptchaVerifier,phone);
// }
// }catch(err){
//   this.serverMessage = err;
// }
// this.loading = false;
// }

}
