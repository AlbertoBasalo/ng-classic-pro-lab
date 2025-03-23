import { Injectable } from '@angular/core';

import {
  catchError,
  concatMap,
  delay,
  forkJoin,
  map,
  Observable,
  of,
} from 'rxjs';
import { Asset, NULL_ASSET } from '../../domain/asset.type';
import { AssetValueService } from './asset-value.service';

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
      id: 4,
      name: 'Gold',
      categoryId: 3,
      symbol: 'XAU',
      quantity: 2,
      value: 2900,
    },
    {
      id: 5,
      name: 'I.B.M.',
      categoryId: 4,
      symbol: 'IBM',
      quantity: 1234,
      value: 263,
    },
    {
      id: 6,
      name: 'Pound Sterling',
      categoryId: 6,
      symbol: 'GBP',
      quantity: 3500,
      value: 1.2,
    },
  ];

  constructor(private assetValueService: AssetValueService) {
    const localData = localStorage.getItem('assets');
    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData.length > 0) {
        this.fakeData = parsedData;
      }
    }
  }

  public getAll$(): Observable<Asset[]> {
    console.log('getAll$');
    return of(this.fakeData).pipe(
      concatMap((assets: Asset[]) => {
        // Create an Observable updater for each asset to get its updated value
        // ! Pay attention to the type of the assetUpdaters$ is an array of Observables
        const assetUpdaters$: Observable<Asset>[] = assets.map((asset) =>
          this.getUpdatedAssetValue$(asset)
        );

        // Combine all asset updaters Observables
        // ! Pay attention to the type of the updatedAssets is an Observable of an array of Assets
        const updatedAssets$: Observable<Asset[]> = forkJoin(assetUpdaters$);
        return updatedAssets$;
      }),
      delay(500) // Simulate network delay
    );
  }

  /**
   * Get an updated asset with current market value
   * @param asset The asset to update
   * @returns Observable with the updated asset
   */
  private getUpdatedAssetValue$(asset: Asset): Observable<Asset> {
    return this.assetValueService
      .getCurrentValue$(asset.categoryId, asset.symbol)
      .pipe(
        // Combine the current value with the asset
        map((currentValue) => ({
          ...asset,
          value: currentValue * (1 + Math.random() * 0.1),
        })),
        // If there's an error getting the value, keep the original
        catchError(() => of(asset))
      );
  }

  public getById$(id: number): Observable<Asset> {
    const asset = this.fakeData.find((asset) => asset.id === id);
    return of(asset || NULL_ASSET);
  }

  public getBySymbol$(symbol: string): Observable<Asset> {
    const asset = this.fakeData.find((asset) => asset.symbol === symbol);
    return of(asset || NULL_ASSET);
  }

  public post$(asset: Asset): Observable<Asset> {
    asset.id = this.fakeData.length + 1;
    this.fakeData.push(asset);
    localStorage.setItem('assets', JSON.stringify(this.fakeData));
    return of(asset);
  }

  public put$(asset: Asset): Observable<Asset> {
    const assetIndex = this.fakeData.findIndex((a) => a.symbol === asset.symbol); 
    if (assetIndex !== -1) {
      this.fakeData[assetIndex] = asset;
      localStorage.setItem('assets', JSON.stringify(this.fakeData));
    }
    return of(asset);
  }

  public delete$(symbol: string): Observable<string> {
    this.fakeData = this.fakeData.filter((asset) => asset.symbol !== symbol);
    localStorage.setItem('assets', JSON.stringify(this.fakeData));
    return of(symbol);
  }
}
