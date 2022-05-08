import { Component } from '@angular/core';
import { TAGS } from 'src/app/shared/constants/tags.constant';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  tags: string[] = TAGS;
  constructor() {}
}
