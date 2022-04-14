import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class PasscodeHelper {
  userData;

  constructor(private usersService: UsersService) {
    this.usersService
      .getUserPasscode()
      .subscribe((res) => (this.userData = res.data()));
  }

  static async hashPasscode(code) {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPasscode = await bcrypt.hashSync(code, salt);

    return hashedPasscode;
  }
}
