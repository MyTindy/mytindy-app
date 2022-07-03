/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { COLLECTIONS_LIST } from 'src/app/shared/constants/collection.constant';
import { TAGS_LIST } from 'src/app/shared/constants/tags.constant';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage {
  @ViewChild('addProductSlider', { static: false }) addProductSlider;
  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public submitAttempt = false;

  isHovering: boolean;
  files: File[] = [];
  imagesURL = [];
  collections = COLLECTIONS_LIST;
  tags = TAGS_LIST;
  productInfo = {
    selectedCollections: [],
    selectedTags: [],
    choosenDetails: {
      name: '',
      description: '',
      colors: [],
      price: 0,
      quantity: 0,
    },
  };

  constructor(private productService: ProductService, private router: Router) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  addImagesURL(url) {
    this.imagesURL.push(url);
    console.log(this.imagesURL);
  }

  updateCollections(collection) {
    this.productInfo.selectedCollections = collection;
  }

  updateTags(tags) {
    this.productInfo.selectedTags = tags;
  }

  updateDetails(details) {
    console.log({ details });
    this.productInfo.choosenDetails = details;
  }

  onSubmit() {
    const data = {
      seller_id: '1490609',
      type: '1',
      product_name: this.productInfo.choosenDetails.name,
      product_type: this.productInfo.selectedCollections[0],
      product_tag: this.productInfo.selectedTags[0],
      product_description: this.productInfo.choosenDetails.description,
      variants: [
        {
          price: `${this.productInfo.choosenDetails.price}`,
          track_inventory: '1',
          quantity: `${this.productInfo.choosenDetails.quantity}`,
          inventory_locations: [
            {
              location_id: '35862',
              variant_quantity: '10',
            },
          ],
        },
      ],
      options: [
        {
          name: 'Title',
          values: 'New',
        },
      ],
      images: [
        {
          image_url: this.imagesURL[0],
          image_alt: 'test-image',
          position: '0',
          image_attachment: 'string',
        },
      ],
    };

    this.productService.postProduct(data).subscribe((res) => {
      console.log({ res });
      this.router.navigate(['/profile']);
    });
  }

  next() {
    this.addProductSlider.slideNext();
  }
  prev() {
    this.addProductSlider.slidePrev();
  }
}
