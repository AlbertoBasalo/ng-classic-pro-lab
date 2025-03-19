import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Asset } from 'src/app/domain/asset.type';

@Injectable({
  providedIn: 'root'
})
export class EditAssetService {
  constructor(private router: Router) { }

  loadAsset$(symbol: string): Observable<Asset> {
    // TODO: Replace with actual API call to get asset by symbol
    return of({
      id: 1,
      name: 'Sample Asset',
      symbol: symbol,
      categoryId: 1,
      quantity: 10,
      value: 1000
    });
  }

  loadCategories$(): Observable<string[]> {
    // TODO: Replace with actual API call
    return of(['stock', 'bond', 'crypto', 'commodity']);
  }

  loadSymbols$(): Observable<string[]> {
    // TODO: Replace with actual API call
    return of(['AAPL', 'MSFT', 'GOOGL', 'AMZN']);
  }

  updateAsset(asset: Asset): void {
    // TODO: Replace with actual API call to update asset
    console.log('Updating asset:', asset);
    this.router.navigate(['/assets']);
  }
} 