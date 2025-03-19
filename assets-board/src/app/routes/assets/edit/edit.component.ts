import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Asset, NULL_ASSET } from 'src/app/domain/asset.type';
import { EditAssetService } from './edit-asset.service';


@Component({
  selector: 'lab-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    this.symbol = this.route.snapshot.paramMap.get('symbol') || '';
    this.asset$ = this.editAsset.loadAsset$(this.symbol);
    // To Do get specific asset from the appropriate repository
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