import { Injectable } from '@angular/core';
import { AssetsStoreService } from 'src/app/shared/assets/assets-store.service';
import { CategoriesRepositoryService } from 'src/app/shared/categories-repository.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(
    private assetsStore: AssetsStoreService,
    private categoriesRepository: CategoriesRepositoryService
  ) {
    this.assetsStore.dispatchSetAssets();
  }

  getAssets$() {
    return this.assetsStore.selectAssets$();
  }

  getCategories$() {
    return this.categoriesRepository.getAll$();
  }
}
