import { Injectable } from '@angular/core';

import { catchError, delay, forkJoin, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Asset } from '../domain/asset.type';
import { AssetValueService } from './asset-value.service';
import { AssetsStoreService } from './assets-store.service';

@Injectable({
  providedIn: 'root',
})
export class AssetsRepositoryService {


  constructor(
    private assetsStore: AssetsStoreService,
    private assetValueService: AssetValueService
  ) {}

  public getAll$(): Observable<Asset[]> {
    return this.assetsStore.selectAssets$().pipe(
      take(1), // To avoid infinite loop caused by the dispatching of changes in the store
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

  public post$(asset: Asset): void {
    // TODO: Prepend with actual API call to add asset
    this.assetsStore.dispatchAddAsset(asset);
  }

  public put$(asset: Asset): void {
    // TODO: Prepend with actual API call to update asset
    this.assetsStore.dispatchUpdateAsset(asset);
  }

  public delete$(symbol: string): void {
    // TODO: Prepend with actual API call to delete asset
    this.assetsStore.dispatchDeleteAsset(symbol);
  }
  
}
