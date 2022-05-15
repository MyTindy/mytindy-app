/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

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
  collections = [
    {
      name: 'Dress',
      value: 'dress',
      image:
        'url(https://www.sultandress.com/wp-content/uploads/2019/03/Muslim-Evening-kaftan-dress-online-shop-3.jpg)',
    },
    {
      name: 'Pants',
      value: 'pants',
      image:
        'url(https://www.realmenrealstyle.com/wp-content/uploads/2021/11/cargo-pants-for-men.jpg)',
    },

    {
      name: 'Hat',
      value: 'hat',
      image:
        'url(http://blog.delusionmfg.com/wp-content/uploads/2020/02/trendy-mens-hat-cowboy-1024x683.jpeg)',
      selected: false,
    },
    {
      name: 'Shoes',
      value: 'shoes',
      image:
        'url(https://static.onecms.io/wp-content/uploads/sites/24/2021/03/24/cariuma-ibi-tout.jpg)',
    },
    {
      name: 'Candle',
      value: 'candle',
      image:
        'url(https://nationaltoday.com/wp-content/uploads/2020/08/world-candle-month-640x514.jpg)',
    },
    {
      name: 'Jewelry',
      value: 'jewelry',
      image:
        'url(https://donjjewellery.com/wp-content/uploads/2022/02/1-CUSTOM-FINE-JEWELRY-.jpg)',
    },
    {
      name: 'Home Decor',
      value: 'home decor',
      image:
        'url(https://images.livemint.com/img/2021/08/31/689x388/spacejoy-IH7wPsjwomc-unsplash_1630396553869_1630396604652.jpg)',
    },
    {
      name: 'Jewelry Box',
      value: 'jewelry box',
      image:
        'url(https://m.media-amazon.com/images/I/713Hk0Ay9mS._AC_SL1500_.jpg)',
    },
    {
      name: 'Bags',
      value: 'bags',
      image:
        'url(http://cdn.shopify.com/s/files/1/0286/9438/0653/collections/bags_1200x630.jpg?v=1649843787)',
    },
    {
      name: 'Bookmark',
      value: 'bookmarks',
      image:
        'url(https://cdn.shopify.com/s/files/1/0110/8633/2000/products/image_f40b62c2-5ffb-429c-98f7-699d65a28ab3.jpg?v=1630280781)',
    },
  ];

  tags = [
    {
      name: 'Women',
      value: 'women',
      image:
        'url(https://i.pinimg.com/474x/83/15/21/83152181a99c5de6fc34a187fb2f0b97.jpg)',
    },
    {
      name: 'Men',
      value: 'men',
      image:
        'url(https://i5.walmartimages.com/asr/cfb84877-da21-4a3d-95a1-b89018589b28_1.392ba840a13d8ed1c9660abdf7dc49d8.jpeg)',
    },
    {
      name: 'Kid',
      value: 'kid',
      image:
        'url(https://cdn.shopify.com/s/files/1/1812/4023/articles/Kids_Fashion_Trends_for_2020_1000x.jpg?v=1582588710)',
    },
    {
      name: 'Baby',
      value: 'baby',
      selected: false,
      image:
        'url(https://cdn.cnn.com/cnnnext/dam/assets/220405172009-hm-baby-clothes-compost-03-super-tease.jpg)',
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
        'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuDqmm8TKmVsJGBPVXvwxZj1hwgVCFYi5z7g&usqp=CAU)',
    },
    { name: 'Necklace', value: 'necklace', image:'url(https://www.manoindigena.com/wp-content/uploads/2020/11/IMG_2364.jpg)' },
    { name: 'Bracelet', value: 'bracelet', image:'url(https://sc01.alicdn.com/kf/UTB8emNIXf2JXKJkSanrq6y3lVXaE.jpg)' },
  ];
  productInfo = {
    selectedCollections: [],
    selectedTags: [],
    choosenDetails: {
      colors: [],
      price: 0,
      description: ''
    }
  };

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

  updateCollections(collection) {
    this.productInfo.selectedCollections = collection;
  }

  updateTags(tags) {
    this.productInfo.selectedTags = tags;
  }

  updateDetails(details) {
    console.log({details});
    this.productInfo.choosenDetails = details;
  }

  //Move to Next slide
  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  //Move to previous slide
  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {
      this.checkIfNavDisabled(object, slideView);
    });
  }

  slideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  next() {
    this.addProductSlider.slideNext();
  }
  prev() {
    this.addProductSlider.slidePrev();
  }
}
