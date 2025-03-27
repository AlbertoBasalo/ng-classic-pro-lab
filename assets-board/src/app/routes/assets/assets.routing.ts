import { Routes } from '@angular/router';

export const ASSETS_ROUTES: Routes = [
  {
    path: 'new',
    loadComponent: () =>
      import('./new/new.component').then((m) => m.NewComponent),
  },
  {
    path: 'edit/:symbol',
    loadComponent: () =>
      import('./edit/edit.component').then((m) => m.EditComponent),
  },
];
