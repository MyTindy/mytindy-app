import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
searchProduct = '';
  constructor() { }
  valueChange(event){
    this.searchProduct= event.target.value;
  }

  ngOnInit() {}

}
