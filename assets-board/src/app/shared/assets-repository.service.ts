import { Injectable } from '@angular/core';

import { catchError, delay, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Asset, NULL_ASSET } from '../domain/asset.type';
import { AssetValueService } from './asset-value.service';
import { AssetsStoreService } from './assets-store.service';

@Injectable({
  providedIn: 'root',
})
export class AssetsRepositoryService {
  private fakeData = [
    {
      id: 1,
      name: 'Bitcoin',
      categoryId: 1,
      symbol: 'BTC',
      quantity: 0.01,
      value: 80000,
    },
    {
      id: 2,
      name: 'Flat NY',
      categoryId: 2,
      symbol: 'FLAT',
      quantity: 1,
      value: 1000000,
    },
    {
      id: 3,
      name: 'Ethereum',
      categoryId: 1,
      symbol: 'ETH',
      quantity: 10,
      value: 2020,
    },
    {
      id: 3,
      name: 'Gold',
      categoryId: 3,
      symbol: 'XAU',
      quantity: 2,
      value: 2900,
    },
    {
      id: 4,
      name: 'I.B.M.',
      categoryId: 4,
      symbol: 'IBM',
      quantity: 1234,
      value: 263,
    },
    {
      id: 5,
      name: 'Pound Sterling',
      categoryId: 6,
      symbol: 'GBP',
      quantity: 3500,
      value: 1.2,
    },
  ];

  constructor(
    private assetsStore: AssetsStoreService,
    private assetValueService: AssetValueService
  ) {}

  public getAll$(): Observable<Asset[]> {
    return of(this.fakeData).pipe(
      switchMap(assets => {
        if (assets.length === 0) {
          return of([]);
        }
        
        // Create an Observable for each asset to get its updated value
        const assetObservables = assets.map(asset => 
          this.assetValueService.getCurrentValue$(asset.categoryId, asset.symbol).pipe(
            // Combine the current value with the asset
            map(currentValue => ({
              ...asset,
              value: currentValue
            })),
            // If there's an error getting the value, keep the original
            catchError(() => of(asset))
          )
        );
        
        // Combine all asset Observables
        return forkJoin(assetObservables);
      }),
      delay(500), // Simulate network delay
      tap(updatedAssets => this.assetsStore.dispatchSetAssets(updatedAssets))
    );
  }

  public getById$(id: number): Observable<Asset> {
    const asset = this.fakeData.find((asset) => asset.id === id);
    return of(asset || NULL_ASSET);
  }

  public post$(asset: Asset): Observable<Asset> {
    const newAsset = { ...asset, id: this.fakeData.length + 1 };
    this.fakeData.push(newAsset);
    return of(newAsset).pipe(
      delay(500),
      tap((newAsset) => this.assetsStore.dispatchAddAsset(newAsset))
    );
  }
}
