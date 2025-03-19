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

/**
 * For real state 
 * - allow to have several assets with the same symbol
 * - allow to set the value and name of the asset
 
* For any other category, 
* - only one asset per symbol is allowed
*   - So, if the user try to add a second asset with the same symbol,
*   - we should fill the form with the existing asset data
*   - and a link to the edit page for that asset
* - Values are not editable, and should come from the API
* - Name is not editable and should come from the API
 */