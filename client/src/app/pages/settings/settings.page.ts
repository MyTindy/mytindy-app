import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
photo = 'https://image.shutterstock.com/image-photo/pottery-artisan-making-fireclay-jugs-260nw-599795654.jpg';
  constructor() { }

  ngOnInit() {
  }
  openOptionSelection(){
    console.log('hello world');
  }
}
