import { Routes } from '@angular/router';

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
    loadChildren: () => import('./routes/rates/rates.routing')  
  },
];
