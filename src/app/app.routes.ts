import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { HausesPageComponent } from './pages/hauses-page/hauses-page.component';

export const routes: Routes = [
  {
    path: 'fullscreen-map',
    component: FullscreenMapPageComponent,
    title: 'Fullscreen Map',
  },
  {
    path: 'markers',
    component: MarkersPageComponent,
    title: 'Markers',
  },
  {
    path: 'hauses',
    component: HausesPageComponent,
    title: 'Available Properties',
  },
  {
    path: '**',
    redirectTo: 'fullscreen-map',
  },
];
