import { Component, AfterViewInit, Input, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { IMapMarker } from '../interfaces';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: any;

  @Input() markers: IMapMarker[] = [
    { cords: [[50.4501, 30.5234],[49.4501, 31.5234]], text: 'This is Vinnytsia' },
  ];
  @Input() mapConfig$: any = {
    center: [50.4501, 30.5234],
    zoom: 5,
  };

  private initMap(): void {
    this.map = L.map('map', {
      center: [50.4501, 30.5234],
      zoom: 4,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        id: 'mapbox/streets-v11',
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  constructor() {}
  ngOnDestroy(): void {
    this.map.remove();
  }

  ngAfterViewInit(): void {
    this.initMap();
     setTimeout(() => {
      if (this.markers)
        this.markers.forEach((discount: any) => {
          discount.cords.forEach((point: any) => {
            L.marker(point).addTo(this.map).bindPopup(discount.text);
          });
          
        });
      const myPins = this.markers?.map((el) => el.cords);
      this.map.fitBounds(myPins);
   }, 1000);
  }
}
