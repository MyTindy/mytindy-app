import { FormArray, ValidatorFn } from '@angular/forms';

export class CheckboxCheckedValidator {
  static minSelectedCheckboxes(min: number) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map((ctrl) => ctrl.value)
        .reduce((prev, next) => (next ? prev + next : prev), 0);
      return totalSelected >= min ? null : { requied: true };
    };
    return validator;
  }
}
