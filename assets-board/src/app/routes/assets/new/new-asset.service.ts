import { Injectable } from '@angular/core';
import { Asset } from 'src/app/domain/asset.type';
import { AssetsRepositoryService } from 'src/app/shared/assets-repository.service';
import { CategoriesRepositoryService } from 'src/app/shared/categories-repository.service';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';
@Injectable({
  providedIn: 'root',
})
export class NewAssetService {
  constructor(
    private assets: AssetsRepositoryService,
    private categories: CategoriesRepositoryService,
    private symbols: SymbolsRepositoryService
  ) {}

  loadCategories$() {
    return this.categories.getAll$();
  }

  saveAsset(asset: Asset) {
    this.assets.post$(asset);
  }

  loadSymbols$() {
    return this.symbols.getSymbols$();
  }
}

