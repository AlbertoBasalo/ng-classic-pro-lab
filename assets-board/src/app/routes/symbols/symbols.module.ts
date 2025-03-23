import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from 'src/app/shared/ui/ui.module';
import { SymbolsRoutingModule } from './symbols-routing.module';
import { SymbolsComponent } from './symbols.component';


@NgModule({
  declarations: [
    SymbolsComponent
  ],
  imports: [
    CommonModule,
    SymbolsRoutingModule,
    UiModule
  ]
})
export class SymbolsModule { }
