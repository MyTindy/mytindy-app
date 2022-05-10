import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COLLECTIONS } from 'src/app/shared/constants/collection.constant';
import { CheckboxCheckedValidator } from 'src/app/validators/checkboxChecked.validator';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
  collectionsForm: FormGroup;
  collectionsList: any = [
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
  submitError = 'Please select at least 1 option.';
  submitSuccess: string;

  constructor(public formBuilder: FormBuilder) {
    this.collectionsForm = this.formBuilder.group({
      collections: new FormArray(
        this.collectionsList.map((x) => new FormControl(x.selected)),
        // adds a custom validator that requires at least 1 checkbox to be selected
        CheckboxCheckedValidator.minSelectedCheckboxes(1)
      ),
    });
    this.collectionsForm.get('collections').valueChanges.subscribe((values) => {
      console.log({ values });
      this.submitSuccess = ''; // reset the submitted values string
    });
  }

  onSubmit() {
    const selectedInterests = [];
    this.collectionsForm.value.collections.map((value: any, index: number) => {
      if (value) {
        selectedInterests.push(this.collectionsList[index].name);
      }
    });
    this.submitSuccess = 'Submitted values: ' + selectedInterests;
  }
}
