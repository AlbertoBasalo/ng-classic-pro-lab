import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/domain/asset.type';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { Category } from 'src/app/domain/category.type';
import { AssetsStoreService } from 'src/app/shared/assets/assets-store.service';
import { CategoriesRepositoryService } from 'src/app/shared/categories-repository.service';
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
    
  ) {
    this.assetsStore.dispatch({ type: 'LOAD_ASSETS', payload: null });
   }

  loadAsset$(symbol: string): Observable<Asset> {
    return this.assetsStore.selectAssetBySymbol$(symbol);
  }

  loadCategories$(): Observable<Category[]> {
    return this.categoriesRepository.getAll$();
  }

  loadSymbols$(): Observable<CategorySymbolVO[]> {
    return this.symbolsRepository.getSymbols$();
  }

  updateAsset(asset: Asset): void {
    this.assetsStore.dispatch({ type: 'UPDATE_ASSET', payload: asset });
  }
  
  deleteAsset(symbol: string): void {
    this.assetsStore.dispatch({ type: 'DELETE_ASSET', payload: symbol });
    this.router.navigate(['/']);
  }
} 