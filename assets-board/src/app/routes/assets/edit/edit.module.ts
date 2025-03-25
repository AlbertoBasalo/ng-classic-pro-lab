import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { EditAssetFormComponent } from './edit-asset-form/edit-asset-form.component';
import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';

@NgModule({
    imports: [
        CommonModule,
        EditRoutingModule,
        ReactiveFormsModule,
        UiModule,
        EditComponent, EditAssetFormComponent
    ],
})
export class EditModule {} 