import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Asset } from 'src/app/domain/asset.type';
import { NewAssetService } from './new-asset.service';
import { NewAssetFormComponent } from './new-asset-form/new-asset-form.component';
import { AsyncPipe } from '@angular/common';
import { PageComponent } from '../../../shared/ui/page/page.component';


/**
 * Routed component to add a new asset
 */
@Component({
    selector: 'lab-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    PageComponent,
    NewAssetFormComponent,
    AsyncPipe
],
})
export class NewComponent {
  protected categories$ = this.newAsset.loadCategories$();
  protected symbols$ = this.newAsset.loadSymbols$();
  
  constructor(private newAsset: NewAssetService) {}

  saveAsset(asset: Asset) {
    this.newAsset.saveAsset(asset);
  }
}
