import { Injectable } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private geolocation: Geolocation) {}

  getUserCoordinates() {
    return this.geolocation
      .getCurrentPosition()
      .then((res) => [res.coords.latitude, res.coords.longitude])
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }
}
