import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-min-map',
  imports: [],
  templateUrl: './min-map.component.html',
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `
})
export class MinMapComponent implements AfterViewInit{

  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng : number, lat: number}>();
  zoom = input<number>(14);


  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false,
      pitch: 30,
    });

    new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
}
