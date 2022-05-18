import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { COLLECTIONS } from 'src/app/shared/constants/collection.constant';
import { CheckboxCheckedValidator } from 'src/app/validators/checkboxChecked.validator';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  @Input() list: any = [];
  @Output() itemsChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  collectionsForm: FormGroup;
  submitError = 'Please select at least 1 option.';
  submitSuccess: string;

  constructor(
    public formBuilder: FormBuilder,
    private textToSpeechService: TextToSpeechService
  ) {}

  ngOnInit(): void {
    this.collectionsForm = this.formBuilder.group({
      collections: new FormArray(
        this.list?.map((x) => new FormControl(x.selected)),
        // adds a custom validator that requires at least 1 checkbox to be selected
        CheckboxCheckedValidator.minSelectedCheckboxes(1)
      ),
    });
    this.collectionsForm.get('collections').valueChanges.subscribe((values) => {
      this.submitSuccess = ''; // reset the submitted values string
    });
  }

  getCollections() {
    return (this.collectionsForm.get('collections') as FormArray).controls;
  }

  onSubmit() {
    const selectedItems = [];
    this.collectionsForm.value.collections?.map((value: any, index: number) => {
      if (value) {
        selectedItems.push(this.list[index].name);
      }
    });
    this.submitSuccess = 'Submitted values: ' + selectedItems;
    console.log(selectedItems);
    this.itemsChange.emit(selectedItems);
  }

  startReading(text) {
    this.textToSpeechService.convertTextToSpeech(text);
  }
}
