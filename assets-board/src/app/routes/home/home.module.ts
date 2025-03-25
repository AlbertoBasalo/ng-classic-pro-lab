import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { AssetsListComponent } from './assets-list/assets-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
    imports: [
    CommonModule,
    HomeRoutingModule,
    HomeComponent,
    AssetsListComponent
]
})
export class HomeModule { }
