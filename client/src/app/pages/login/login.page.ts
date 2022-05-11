import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  phoneNumber: string;
  formType: 'login' | 'Register' | 'reset' = 'Register';
  isSubmitted = false;

  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  get isLogin(): boolean {
    return this.formType === 'login';
  }

  get isSignup(): boolean {
    return this.formType === 'Register';
  }
  changeFormType(value: 'login' | 'Register' | 'reset' = 'Register') {
    this.formType = value;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
          Validators.pattern('^[a-zA-Z\\s]+$'),
        ],
      ],
    });
  }

  get errorControl() {
    return this.loginForm.controls;
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
  }

  signinWithPhoneNumber() {
    try {
      if (this.phoneNumber) {
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

  async onSubmit() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      await this.authService.storeUsernameAndPhone(
        this.loginForm.value.fullName
      );

      await this.authService
        .signInWithPhoneNumber(this.recaptchaVerifier, this.phoneNumber)
        .then((success) => {
          this.router.navigate(['/confirm']);
        });
    }
  }

  validation_messages = {
    fullName: [
      { type: 'required', message: '- Full Name is required.' },
      {
        type: 'minlength',
        message: '- Name must be at least 5 characters long.',
      },
      {
        type: 'maxlength',
        message: '- Name cannot be more than 25 characters long.',
      },
      {
        type: 'pattern',
        message: '- Your fullname must contain letters and spaces only.',
      },
    ],
  };
}
