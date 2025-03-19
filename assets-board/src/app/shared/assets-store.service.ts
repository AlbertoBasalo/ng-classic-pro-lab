import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';
import { Asset, NULL_ASSET } from '../domain/asset.type';

@Injectable({
  providedIn: 'root',
})
export class AssetsStoreService implements OnDestroy {
  private assets = new BehaviorSubject<Asset[]>([]);
  private readonly STORAGE_KEY = 'assets-board-data';
  private subscription: Subscription;

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

  constructor() {
    this.loadFromLocalStorage();
    this.subscription = this.assets.subscribe(assets => {
      this.saveToLocalStorage(assets);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public selectAssets$(): Observable<Asset[]> {
    return this.assets.asObservable();
  }

  private saveToLocalStorage(assets: Asset[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(assets));
    } catch (error) {
      console.error('Error saving assets to localStorage:', error);
    }
  }

  private loadFromLocalStorage(): void {
    try {
      const storedAssets = localStorage.getItem(this.STORAGE_KEY);
      if (storedAssets && storedAssets.length > 0) {
        this.assets.next(JSON.parse(storedAssets));
      }
      else {
        this.assets.next(this.fakeData);
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
  }

  public dispatchAddAsset(asset: Asset): void {
    const assets = this.assets.value;
    const newAsset = { ...asset, id: assets.length + 1 };
    this.assets.next([...assets, newAsset]);
  }

  public dispatchUpdateAsset(asset: Asset): void {
    const assets = this.assets.value;
    const index = assets.findIndex((a) => a.id === asset.id);
    if (index !== -1) {
      assets[index] = asset;
      this.assets.next([...assets]);
    }
  }

  public dispatchDeleteAsset(symbol: string): void {
    const assets = this.assets.value;
    const index = assets.findIndex((a) => a.symbol === symbol);
    if (index !== -1) {
      assets.splice(index, 1);
      this.assets.next([...assets]);
    }
  }
}
