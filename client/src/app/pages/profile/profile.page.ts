import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  photo = 'https://image.shutterstock.com/image-photo/pottery-artisan-making-fireclay-jugs-260nw-599795654.jpg';
  slideOpts = {
    freeMode: true,
    centeredSlides: true,
    slidesPerView: 1.5,
    slidesOffsetBefore: 11,
    spaceBetween: 10,
    loop: true,
    speed: 200,
    autoplay: true,
  };

  categories = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json  ')
      .subscribe((res: any) => {
        this.categories = res.categories;
      });
  }
}
