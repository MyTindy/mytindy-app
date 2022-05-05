import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  isHovering: boolean;
  mockData: any;
  sellers;

  files: File[] = [];

  constructor(
    private productService: ProductService,
    public usersService: UsersService
  ) {}

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

  postProduct() {}

  getSellers() {
    this.usersService.getSellers().subscribe((data) => (this.sellers = data));
  }

  postSeller() {
    const info = {
      sp_store_name: 'development',
      seller_name: 'Nujood2',
      email: 'shwar.nujood@gmail.com',
      password: 'Nujood@2020',
    };
    this.usersService.createSellers(info).subscribe((res) => console.log(res));
  }

  getSeller() {
    this.usersService.getSeller(1043962).subscribe((res) => console.log(res));
  }

  updateSeller() {
    const info = {
      sp_store_name: 'development',
      seller_name: 'Jood',
      email: 'nujood@gmail.com',
      password: 'Nujood@2020',
    };
    this.usersService
      .updateSeller(1043962, info)
      .subscribe((res) => console.log(res));
  }

  removeSeller() {
    this.usersService
      .deleteSeller(1043963)
      .subscribe((res) => console.log(res));
  }
}
