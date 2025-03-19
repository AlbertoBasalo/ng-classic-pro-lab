import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Asset, NULL_ASSET } from '../domain/asset.type';

@Injectable({
  providedIn: 'root',
})
export class AssetsStoreService {
  private assets = new BehaviorSubject<Asset[]>([]);

  public selectAssets$(): Observable<Asset[]> {
    return this.assets.asObservable();
  }

  public selectAssetBySymbol$(symbol: string): Observable<Asset> {
    return this.assets.pipe(
      map((assets) => assets.find((asset) => asset.symbol === symbol) || NULL_ASSET)
    );
  }

  public selectAssetById$(id: number): Observable<Asset> {
    return this.assets.pipe(
      map((assets) => assets.find((asset) => asset.id === id) || NULL_ASSET)
    );
  }

  public selectTotalAmount$(): Observable<number> {
    return this.assets.pipe(
      map((assets) =>
        assets.reduce((acc, asset) => acc + asset.quantity * asset.value, 0)
      )
    );
  }

  public dispatchSetAssets(assets: Asset[]): void {
    this.assets.next(assets);
  }

  public dispatchAddAsset(asset: Asset): void {
    this.assets.next([...this.assets.value, asset]);
  }
}
