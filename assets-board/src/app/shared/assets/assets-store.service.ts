import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Asset, NULL_ASSET } from '../../domain/asset.type';
import { AssetsRepositoryService } from './assets-repository.service';

@Injectable({
  providedIn: 'root',
})
export class AssetsStoreService {
  private assets = new BehaviorSubject<Asset[]>([]);

  public assets$ = this.assets.asObservable();

  constructor(private assetsRepositoryService: AssetsRepositoryService) {
    this.dispatchSetAssets();
  }

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

  // ToDo: manage subscriptions from the repository service

  public dispatchSetAssets(): void {
    this.assetsRepositoryService.getAll$().subscribe((assets) => {  
      this.assets.next(assets);
    });
  }

  public dispatchAddAsset(asset: Asset): void {
    this.assetsRepositoryService.post$(asset).subscribe((asset) => {
      this.assets.next([...this.assets.value, asset]);
    });
  }

  public dispatchUpdateAsset(asset: Asset): void {
    this.assetsRepositoryService.put$(asset).subscribe((asset) => {
      const assets = this.assets.value;
      const index = assets.findIndex((a) => a.id === asset.id);
      if (index !== -1) {
        assets[index] = asset;
        this.assets.next([...assets]);
      }
    });
  }

  public dispatchDeleteAsset(symbol: string): void {
    this.assetsRepositoryService.delete$(symbol).subscribe((symbol) => {
      const assets = this.assets.value;
      const index = assets.findIndex((a) => a.symbol === symbol);
      if (index !== -1) {
        assets.splice(index, 1);
        this.assets.next([...assets]);
      }
    });
  }
}
