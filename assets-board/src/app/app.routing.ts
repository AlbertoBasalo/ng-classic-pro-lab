import { Routes } from '@angular/router';
import { hasPowersGuard } from './core/has-powers.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./routes/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'assets',
    loadChildren: () =>
      import('./routes/assets/assets.routing').then((m) => m.ASSETS_ROUTES),
  },
  {
    path: 'symbols', 
    loadComponent: () => import('./routes/symbols/symbols.component'),
  },
  {
    path: 'rates',
    canActivate: [hasPowersGuard],
    loadChildren: () => import('./routes/rates/rates.routing')  
  },
];
