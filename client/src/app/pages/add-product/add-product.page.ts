import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage {
  isHovering: boolean;
  files: File[] = [];
  collections = [
    { name: 'Dress', value: 'dress' },
    { name: 'Pants', value: 'pants' },
    { name: 'Shorts', value: 'shorts' },
    { name: 'Hat', value: 'hat', selected: true },
    { name: 'Shoes', value: 'shoes' },
    { name: 'Candle', value: 'candle' },
    { name: 'Jewelry', value: 'jewelry' },
    { name: 'Home Decor', value: 'home decor' },
    { name: 'Jewelry Box', value: 'jewelry box' },
    { name: 'Bags', value: 'bags' },
  ];

  tags = [
    { name: 'Tag', value: 'tag' },
    { name: 'Pants', value: 'pants' },
    { name: 'Shorts', value: 'shorts' },
    { name: 'Hat', value: 'hat', selected: true },
    { name: 'Shoes', value: 'shoes' },
    { name: 'Candle', value: 'candle' },
    { name: 'Jewelry', value: 'jewelry' },
    { name: 'Home Decor', value: 'home decor' },
    { name: 'Jewelry Box', value: 'jewelry box' },
    { name: 'Bags', value: 'bags' },
  ];

  constructor(private productService: ProductService) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  getProducts() {
    this.productService.getProduct().subscribe((data) => {
      console.log(data);
    });
  }
}
