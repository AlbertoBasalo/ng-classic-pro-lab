import { Injectable } from "@angular/core";
import { AssetsRepositoryService } from "./assets-repository.service";
import { AssetsStoreService } from "./assets-store.service";

@Injectable({
  providedIn: 'root',
})
export class AssetsEffects {
  constructor(
    private assetsStore: AssetsStoreService,
    private assetsRepository: AssetsRepositoryService
  ) {}

  configForRoot() {
        this.assetsStore.selectActions$().subscribe((action) => {
      console.log('action', action);
      switch (action.type) {
        case 'LOAD_ASSETS':
          this.assetsRepository.getAll$().subscribe((assets) => {
            this.assetsStore.reduceSetAssets(assets);
          });
          break;
        case 'ADD_ASSET':
          this.assetsRepository.post$(action.payload).subscribe((newAsset) => {
            this.assetsStore.reduceAddAsset(newAsset);
          });
          break;
        case 'UPDATE_ASSET':
          this.assetsRepository
            .put$(action.payload)
            .subscribe((updatedAsset) => {
              this.assetsStore.reduceUpdateAsset(updatedAsset);
            });
          break;
        case 'DELETE_ASSET':
          this.assetsRepository.delete$(action.payload).subscribe(() => {
            this.assetsStore.reduceDeleteAsset(action.payload); // symbol
          });
      }
    });
  }
}
