import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from 'src/app/shared/ui/ui.module';
import { RatesRoutingModule } from './rates-routing.module';
import { RatesComponent } from './rates.component';


@NgModule({
  declarations: [
    RatesComponent
  ],
  imports: [
    CommonModule,
    RatesRoutingModule,
    UiModule
  ]
})
export class RatesModule { }
