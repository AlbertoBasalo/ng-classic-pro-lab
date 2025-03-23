import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/domain/asset.type';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { Category } from 'src/app/domain/category.type';
import { AssetsStoreService } from 'src/app/shared/assets/assets-store.service';
import { CategoriesRepositoryService } from 'src/app/shared/categories-repository.service';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';

@Injectable({
  providedIn: 'root',
})
export class NewAssetService {
  constructor(
    private assetsStore: AssetsStoreService,
    private categories: CategoriesRepositoryService,
    private symbols: SymbolsRepositoryService
  ) {}

  /**
   * Load all categories
   */ 
  loadCategories$(): Observable<Category[]> {
    return this.categories.getAll$();
  }

  /**
   * Load all symbols
   */
  loadSymbols$(): Observable<CategorySymbolVO[]> {
    return this.symbols.getSymbols$();
  }

 /**
  * Save a new asset
  * @param asset The asset to save
  */
  saveAsset(asset: Asset):void {
    this.assetsStore.dispatch({ type: 'ADD_ASSET', payload: asset });
  }
}

