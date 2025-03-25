import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { AssetsRepositoryService } from "./assets-repository.service";
import { AssetsStoreService } from "./assets-store.service";

@Injectable({
  providedIn: 'root',
})
export class AssetsEffects {
  constructor(
    private assetsStore: AssetsStoreService,
    private assetsRepository: AssetsRepositoryService
  ) {
  }

  configForRoot() {
    this.assetsStore.selectActions$().subscribe((action) => {
      switch (action.type) {
        case 'LOAD_ASSETS':
          this.assetsRepository.getAll$()
            .pipe(tap((assets) => this.assetsStore.reduceSetAssets(assets)))
            .subscribe();
          break;
        case 'ADD_ASSET':
          this.assetsRepository.post$(action.payload)
            .pipe(tap((newAsset) => this.assetsStore.reduceAddAsset(newAsset)))
            .subscribe();
          break;
        case 'UPDATE_ASSET':
          this.assetsRepository.put$(action.payload)
            .pipe(tap((updatedAsset) => this.assetsStore.reduceUpdateAsset(updatedAsset)))
            .subscribe();
          break;
        case 'DELETE_ASSET':
          this.assetsRepository.delete$(action.payload)
            .pipe(tap(() => this.assetsStore.reduceDeleteAsset(action.payload)))
            .subscribe();
          break;
        default:
          break;
      }
    });
  }
}
