import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map, Observable, of, tap } from 'rxjs';
import { Asset, NULL_ASSET } from 'src/app/domain/asset.type';
import { EditAssetService } from './edit-asset.service';
import { EditAssetFormComponent } from './edit-asset-form/edit-asset-form.component';
import { PageComponent } from '../../../shared/ui/page/page.component';
import { AsyncPipe } from '@angular/common';


@Component({
    selector: 'lab-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
    PageComponent,
    EditAssetFormComponent,
    AsyncPipe
],
})
export class EditComponent implements OnInit {
  protected asset$: Observable<Asset> = of(NULL_ASSET);
  protected categories$ = this.editAsset.loadCategories$();
  protected symbols$ = this.editAsset.loadSymbols$();
  private symbol: string = '';

  constructor(
    private route: ActivatedRoute,
    private editAsset: EditAssetService
  ) {}

  ngOnInit(): void {
    this.asset$ = this.route.paramMap.pipe(
      map((params) => params.get('symbol') || ''),
      tap((symbol) => (this.symbol = symbol)),
      concatMap((symbol) => this.editAsset.loadAsset$(symbol))
    );
  }

  updateAsset(asset: Asset): void {
    this.editAsset.updateAsset(asset);
  }
  
  deleteAsset(): void {
    if (this.symbol) {
      this.editAsset.deleteAsset(this.symbol);
    }
  }
} 