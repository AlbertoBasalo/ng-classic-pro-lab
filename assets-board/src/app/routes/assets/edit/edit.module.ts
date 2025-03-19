import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { EditAssetFormComponent } from './edit-asset-form/edit-asset-form.component';

@NgModule({
  declarations: [EditComponent, EditAssetFormComponent],
  imports: [
    CommonModule,
    EditRoutingModule,
    ReactiveFormsModule
  ],
})
export class EditModule {} 