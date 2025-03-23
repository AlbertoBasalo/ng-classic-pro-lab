import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymbolsComponent } from './symbols.component';

const routes: Routes = [{ path: '', component: SymbolsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SymbolsRoutingModule { }
