import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UiModule } from 'src/app/shared/ui/ui.module';
import { AssetsListComponent } from './assets-list/assets-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    AssetsListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    UiModule
  ]
})
export class HomeModule { }
