import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

mapboxgl.accessToken = environment.mapboxKey;
@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit{

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null)

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-75.720672, 4.798518], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    const marker = new mapboxgl.Marker({
      draggable: false,
      color: '#FF0000'
    })
      .setLngLat([-75.720672, 4.798518])
      .addTo(map);

    marker.on('dragend', (event) => {
      console.log(event);
    })

    this.mapListener(map);
  }

  mapListener(map: mapboxgl.Map) {
    console.log('object');
  }
}
