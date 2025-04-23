import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';
import { v4 as UUIDV4 } from 'uuid'
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}
@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit{

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-75.720672, 4.798518], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    // const marker = new mapboxgl.Marker({
    //   draggable: false,
    //   color: '#FF0000'
    // })
    //   .setLngLat([-75.720672, 4.798518])
    //   .addTo(map);

    // marker.on('dragend', (event) => {
    //   console.log(event);
    // })

    this.mapListener(map);
  }

  mapListener(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {

    if(!this.map()) return;

    const map = this.map()!;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    console.log(event.lngLat);

    const coords = event.lngLat;

    const maxboxMarker = new mapboxgl.Marker({
      color: color,
    }).setLngLat(coords)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDV4(),
      mapboxMarker: maxboxMarker,
    }
    this.markers.set([newMarker, ...this.markers()]);

    console.log(this.markers());
  }

  flyToMarker(lanLat: LngLatLike) {
    if(!this.map()) return;
    this.map()?.flyTo({
      center: lanLat,
    })
  }

  deleteMarker(marker: Marker){
    if(!this.map()) return;

    const map = this.map()!;

    marker.mapboxMarker.remove();

    this.markers.set(this.markers().filter(m => m.id !== marker.id));
  }
}
