import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  isHovering: boolean;
  mockData: any;

  files: File[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {}
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
