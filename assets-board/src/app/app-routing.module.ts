import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./routes/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'assets',
    loadChildren: () =>
      import('./routes/assets/assets.module').then((m) => m.AssetsModule),
  },
  { 
    path: 'symbols', 
    loadChildren: () => import('./routes/symbols/symbols.module').then(m => m.SymbolsModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
