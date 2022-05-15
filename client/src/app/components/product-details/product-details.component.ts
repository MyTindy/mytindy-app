import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray,FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  @Output() detailsChange = new EventEmitter<string[]>();

  detailsForm: FormGroup;
  colorOptions: string[] = ['red','green','orange','blue'];

  constructor() {
    this.detailsForm = new FormGroup({
      description: new FormControl('',Validators.required),
      colors: new FormArray([]),
      price: new FormControl(null,Validators.required, ),
    });
    this.colorOptions?.forEach(() => this.detailsFormArray?.push(new FormControl()));
  }

  get detailsFormArray() {
    return this.detailsForm.controls.colors as FormArray;
  }

  submitForm() {
    console.log(this.detailsForm.value);
    this.detailsChange.emit(this.detailsForm.value);
  }
}
