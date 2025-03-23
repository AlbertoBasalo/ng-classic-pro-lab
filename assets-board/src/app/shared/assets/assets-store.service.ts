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
    const newState = [ ...assets];
    this.assets.next(newState);
  }
  public reduceAddAsset(newAsset: Asset): void {
    const state = this.assets.value;
    const newState = [...state, newAsset];
    this.assets.next(newState);
  }
  public reduceUpdateAsset(updatedAsset: Asset): void {
    const state = this.assets.value;
    const newState = state.map((a) => a.symbol === updatedAsset.symbol ? updatedAsset : a);
    this.assets.next(newState);
  }
  public reduceDeleteAsset(symbol: string): void {
    const state = this.assets.value;
    const newState = state.filter((asset) => asset.symbol !== symbol);
    this.assets.next(newState);
  }

  public dispatch(action: Action) {
      // ToDo: 
      // - emit Action with state
      // - Wait for the action to be processed
      // - remove reducers and use effects instead
    this.actions.next(action);
  }
}


