import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Asset, NULL_ASSET } from '../domain/asset.type';

@Injectable({
  providedIn: 'root',
})
export class AssetsStoreService {
  private assets = new BehaviorSubject<Asset[]>([]);
  private readonly STORAGE_KEY = 'assets-board-data';

  constructor() {
    this.loadFromLocalStorage();
  }

  public selectAssets$(): Observable<Asset[]> {
    return this.assets.asObservable();
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.assets.value));
    } catch (error) {
      console.error('Error saving assets to localStorage:', error);
    }
  }

  private loadFromLocalStorage(): void {
    try {
      const storedAssets = localStorage.getItem(this.STORAGE_KEY);
      if (storedAssets) {
        this.assets.next(JSON.parse(storedAssets));
      }
    } catch (error) {
      console.error('Error loading assets from localStorage:', error);
    }
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
    this.saveToLocalStorage();
  }

  public dispatchAddAsset(asset: Asset): void {
    const assets = this.assets.value;
    const newAsset = { ...asset, id: assets.length + 1 };
    this.assets.next([...assets, newAsset]);
    this.saveToLocalStorage();
  }

  public dispatchUpdateAsset(asset: Asset): void {
    const assets = this.assets.value;
    const index = assets.findIndex((a) => a.id === asset.id);
    if (index !== -1) {
      assets[index] = asset;
      this.assets.next([...assets]);
      this.saveToLocalStorage();
    }
  }

  public dispatchDeleteAsset(symbol: string): void {
    const assets = this.assets.value;
    const index = assets.findIndex((a) => a.symbol === symbol);
    if (index !== -1) {
      assets.splice(index, 1);
      this.assets.next([...assets]);
      this.saveToLocalStorage();
    }
  }
}
