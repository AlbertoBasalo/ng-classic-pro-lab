import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { NewAssetFormComponent } from './new-asset-form/new-asset-form.component';
import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';

@NgModule({
    imports: [CommonModule, NewRoutingModule, ReactiveFormsModule, UiModule, NewComponent, NewAssetFormComponent],
})
export class NewModule {}
