import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { SymbolsRoutingModule } from './symbols-routing.module';
import { SymbolsComponent } from './symbols.component';


@NgModule({
    imports: [
    CommonModule,
    SymbolsRoutingModule,
    SymbolsComponent
]
})
export class SymbolsModule { }
