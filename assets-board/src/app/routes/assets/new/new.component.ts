import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Asset } from 'src/app/domain/asset.type';
import { NewAssetService } from './new-asset.service';

@Component({
  selector: 'lab-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewComponent {
  protected categories$ = this.newAsset.loadCategories$();
  protected symbols$ = this.newAsset.loadSymbols$();
  constructor(private newAsset: NewAssetService) {}

  saveAsset(asset: Asset) {
    console.log('saveAsset', asset);
    this.newAsset.saveAsset(asset);
  }
}
