import { Router } from '@angular/router';
import { Component} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {
  constructor(public router: Router) {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2500);
  }

}
