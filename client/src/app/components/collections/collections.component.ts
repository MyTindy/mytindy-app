import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { COLLECTIONS } from 'src/app/shared/constants/collection.constant';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  // collections: string[] = COLLECTIONS;
  collectionsList = [
    'Dress',
    'Pants',
    'Shorts',
    'Hat',
    'Shoes',
    'Candle',
    'Jewelry',
    'Home Decor',
    'Jewelry Box',
    'Bags',
  ];
  collectionsForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.collectionsForm = this.formBuilder.group({
      collections: [''],
    });
  }
  onSubmit() {
    console.log(this.collectionsForm);
  }
}
