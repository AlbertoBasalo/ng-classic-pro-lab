import { Injectable } from '@angular/core';
import { Asset } from 'src/app/domain/asset.type';
import { CategoriesRepositoryService } from 'src/app/shared/categories-repository.service';
import { AssetsStoreService } from 'src/app/shared/store/assets-store.service';
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

  loadCategories$() {
    return this.categories.getAll$();
  }

  saveAsset(asset: Asset) {
    this.assetsStore.dispatchAddAsset(asset);
  }

  loadSymbols$() {
    return this.symbols.getSymbols$();
  }
}

