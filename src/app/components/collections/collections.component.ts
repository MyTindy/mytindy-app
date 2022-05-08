import { Component } from '@angular/core';
import { COLLECTIONS } from 'src/app/shared/constants/collection.constant';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
  collections: string[] = COLLECTIONS;
  constructor() {}
}
