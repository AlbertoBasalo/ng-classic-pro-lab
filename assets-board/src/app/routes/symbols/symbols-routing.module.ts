import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasPowersGuard } from 'src/app/core/has-powers.guard';
import { SymbolsComponent } from './symbols.component';

const routes: Routes = [
  { path: '', component: SymbolsComponent, canActivate: [HasPowersGuard] },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SymbolsRoutingModule { }
