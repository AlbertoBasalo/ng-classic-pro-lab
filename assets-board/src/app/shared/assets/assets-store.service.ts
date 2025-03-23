import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Asset, NULL_ASSET } from '../../domain/asset.type';
import { Action } from './assets-actions.type';

@Injectable({
  providedIn: 'root',
})
export class AssetsStoreService {
  private assets = new BehaviorSubject<Asset[]>([]);

  // ToDo:
  // - emit {action, state}
  private actions = new Subject<Action>();

  constructor() {
    this.dispatch({ type: 'LOAD_ASSETS', payload: null });
  }

  public selectActions$(): Observable<Action> {
    return this.actions.asObservable();
  }

  public selectAssetBySymbol$(symbol: string): Observable<Asset> {
    return this.assets.pipe(
      map(
        (assets) =>
          assets.find((asset) => asset.symbol === symbol) || NULL_ASSET
      )
    );
  }

  public selectAssetById$(id: number): Observable<Asset> {
    return this.assets.pipe(
      map((assets) => assets.find((asset) => asset.id === id) || NULL_ASSET)
    );
  }

  public selectAssets$(): Observable<Asset[]> {
    return this.assets.asObservable();
  }
  public selectTotalAmount$(): Observable<number> {
    return this.assets.pipe(
      map((assets) =>
        assets.reduce((acc, asset) => acc + asset.quantity * asset.value, 0)
      )
    );
  }
  public reduceSetAssets(assets: Asset[]): void {
    this.assets.next(assets);
  }
  public reduceAddAsset(newAsset: Asset): void {
    this.assets.next([...this.assets.value, newAsset]);
  }
  public reduceUpdateAsset(updatedAsset: Asset): void {
    this.assets.next(
      this.assets.value.map((asset) =>
        asset.symbol === updatedAsset.symbol ? updatedAsset : asset
      )
    );
  }
  public reduceDeleteAsset(symbol: string): void {
    this.assets.next(
      this.assets.value.filter((asset) => asset.symbol !== symbol)
    );
  }

  public dispatch(action: Action) {
      // ToDo: 
      // - emit Action with state
      // - Wait for the action to be processed
      // - remove reducers and use effects instead
    this.actions.next(action);
  }
}


