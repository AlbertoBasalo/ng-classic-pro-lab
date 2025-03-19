import { Injectable } from '@angular/core';

import { catchError, delay, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Asset } from '../domain/asset.type';
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
      switchMap((assets: Asset[]) => {      
        // Create an Observable updater for each asset to get its updated value
        // ! Pay attention to the type of the assetUpdaters$ is an array of Observables
        const assetUpdaters$: Observable<Asset>[] = assets.map(asset => this.getUpdatedAssetValue$(asset));
        
        // Combine all asset updaters Observables
        // ! Pay attention to the type of the updatedAssets is an Observable of an array of Assets
        const updatedAssets$: Observable<Asset[]> = forkJoin(assetUpdaters$);
        return updatedAssets$;
      }),
      delay(500), // Simulate network delay
      tap(updatedAssets => this.assetsStore.dispatchSetAssets(updatedAssets))
    );
  }

  /**
   * Get an updated asset with current market value
   * @param asset The asset to update
   * @returns Observable with the updated asset
   */
  private getUpdatedAssetValue$(asset: Asset): Observable<Asset> {
    return this.assetValueService.getCurrentValue$(asset.categoryId, asset.symbol).pipe(
      // Combine the current value with the asset
      map(currentValue => ({
        ...asset,
        value: currentValue * (1 + Math.random() * 0.1)
      })),
      // If there's an error getting the value, keep the original
      catchError(() => of(asset))
    );
  }

  public getById$(id: number): Observable<Asset> {
    const asset$ = this.assetsStore.selectAssetById$(id);
    return asset$;
  }

  public getBySymbol$(symbol: string): Observable<Asset> {
    const asset$ = this.assetsStore.selectAssetBySymbol$(symbol);
    return asset$;
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
