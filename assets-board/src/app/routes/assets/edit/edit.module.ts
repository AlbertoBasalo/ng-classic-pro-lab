import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EditAssetFormComponent } from './edit-asset-form/edit-asset-form.component';
import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';

@NgModule({
    imports: [
    CommonModule,
    EditRoutingModule,
    ReactiveFormsModule,
    EditComponent, EditAssetFormComponent
],
})
export class EditModule {} 