/* eslint-disable @typescript-eslint/naming-convention */
import { Component,OnInit,ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage {
  @ViewChild('addProductSlider',{ static: false }) addProductSlider;
  public slideOneForm: FormGroup;
  public slideTwoForm: FormGroup;
  public submitAttempt = false;

  isHovering: boolean;
  files: File[] = [];
  imagesURL = [];
  collections = [
    {
      name: 'Dress',
      value: 'dress',
      image:
        'url(https://api.iconify.design/emojione-v1/dress.svg)',
    },
    {
      name: 'Hat',
      value: 'hat',
      image:
        'url(https://api.iconify.design/emojione-v1/womans-hat.svg)',
      selected: false,
    },
    {
      name: 'Shoes',
      value: 'shoes',
      image:
        'url(https://api.iconify.design/emojione/running-shoe.svg)',
    },
    {
      name: 'Candle',
      value: 'candle',
      image:
        'url(https://api.iconify.design/emojione-v1/candle.svg)',
    },
    {
      name: 'Jewelry',
      value: 'jewelry',
      image:
        'url(https://api.iconify.design/maki/jewelry-store.svg?color=%23ff190c)',
    },
    {
      name: 'Home Decor',
      value: 'home decor',
      image:
        'url(https://api.iconify.design/flat-color-icons/home.svg)',
    },
    {
      name: 'Jewelry Box',
      value: 'jewelry box',
      image:
        'url(https://api.iconify.design/emojione-v1/card-file-box.svg)',
    },
    {
      name: 'Bags',
      value: 'bags',
      image:
        'url(https://api.iconify.design/twemoji/handbag.svg)',
    },
    {
      name: 'Bookmark',
      value: 'bookmarks',
      image:
        'url(https://api.iconify.design/emojione/closed-book.svg)',
    },
    {
      name: 'Pants',
      value: 'pants',
      image:
        'url(https://api.iconify.design/icon-park/clothes-pants.svg?color=%23ff190c)',
    },
  ];

  tags = [
    {
      name: 'Women',
      value: 'women',
      image:
        'url(https://api.iconify.design/emojione/woman-medium-light-skin-tone.svg)',
    },
    {
      name: 'Men',
      value: 'men',
      image:
        'url(https://api.iconify.design/emojione/man-light-skin-tone.svg)',
    },
    {
      name: 'Kid',
      value: 'kid',
      image:
        'url(https://api.iconify.design/noto/child-light-skin-tone.svg)',
    },
    {
      name: 'Baby',
      value: 'baby',
      selected: false,
      image:
        'url(https://api.iconify.design/emojione/baby-medium-light-skin-tone.svg)',
    },
    {
      name: 'Wool',
      value: 'wool',
      image:
        'url(https://cf.ltkcdn.net/fashion-history/images/orig/210917-3504x2336-Wool-in-natural-colors.jpg)',
    },
    {
      name: 'SkinCare',
      value: 'skincare',
      image:
        'url(https://api.iconify.design/emojione/person-getting-massage-light-skin-tone.svg)',
    },
    { name: 'Necklace',value: 'necklace',image: 'url(https://api.iconify.design/icon-park/diamond-necklace.svg)' },
    { name: 'Bracelet',value: 'bracelet',image: 'url(https://sc01.alicdn.com/kf/UTB8emNIXf2JXKJkSanrq6y3lVXaE.jpg)' },
  ];
  productInfo = {
    selectedCollections: [],
    selectedTags: [],
    choosenDetails: {
      name: '',
      description: '',
      colors: [],
      price: 0,
      quantity: 0,
    }
  };

  constructor(private productService: ProductService,private router: Router) {}

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for(let i = 0; i < files.length; i++) {
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
          price: `${ this.productInfo.choosenDetails.price }`,
          track_inventory: '1',
          quantity: `${ this.productInfo.choosenDetails.quantity }`,
          inventory_locations: [
            {
              location_id: '35862',
              variant_quantity: '10'
            }
          ]
        }
      ],
      options: [
        {
          name: 'Title',
          values: 'New'
        }
      ],
      images: [
        {
          image_url: this.imagesURL[0],
          image_alt: 'test-image',
          position: '0',
          image_attachment: 'string'
        },
      ]
    };

    this.productService.postProduct(data).subscribe((res) => {
      console.log({ res });
      this.router.navigate(['/tabs/profile']);
    });
}


  next() {
    this.addProductSlider.slideNext();
  }
  prev() {
    this.addProductSlider.slidePrev();
  }
}
