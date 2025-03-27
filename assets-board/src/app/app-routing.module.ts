import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatesResolver } from './routes/rates/rates.resolver';

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
  { 
    path: 'rates', 
    resolve: { rates: RatesResolver },
    loadChildren: () => import('./routes/rates/rates.module').then(m => m.RatesModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
