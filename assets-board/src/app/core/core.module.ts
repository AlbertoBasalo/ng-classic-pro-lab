import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { ThemeToggleComponent } from './layout/theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [HeaderComponent, ThemeToggleComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
