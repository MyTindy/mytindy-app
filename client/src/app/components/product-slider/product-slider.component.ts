import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss'],
})
export class ProductSliderComponent implements OnInit {
  @Input() imagesURL: string[] = [];

  slideOpts = {
    freeMode: true,
    centeredSlides: true,
    slidesPerView: 1.5,
    slidesOffsetBefore: 11,
    spaceBetween: 10,
    loop: true,
    speed: 100,
    autoplay: true,
  };

  constructor() {}

  ngOnInit() {}

  onSlideTransitionStart(images) {
    images.startAutoplay();
  }
}
