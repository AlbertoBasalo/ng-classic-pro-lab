import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';
import { Symbol } from 'src/app/domain/symbol.type';
import { CategoriesRepositoryService } from 'src/app/shared/categories-repository.service';
import { AssetsStoreService } from 'src/app/shared/store/assets-store.service';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';
@Injectable({
  providedIn: 'root'
})
export class EditAssetService {
  constructor(
    private router: Router,
    private assetsStore: AssetsStoreService,
    private categoriesRepository: CategoriesRepositoryService,
    private symbolsRepository: SymbolsRepositoryService,
    
  ) { }

  loadAsset$(symbol: string): Observable<Asset> {
    return this.assetsStore.selectAssetBySymbol$(symbol);
  }

  loadCategories$(): Observable<Category[]> {
    return this.categoriesRepository.getAll$();
  }

  loadSymbols$(): Observable<Symbol[]> {
    return this.symbolsRepository.getSymbols$();
  }

  updateAsset(asset: Asset): void {
    this.assetsStore.dispatchUpdateAsset(asset);
  }
  
  deleteAsset(symbol: string): void {
    this.assetsStore.dispatchDeleteAsset(symbol);
    this.router.navigate(['/']);
  }
} 