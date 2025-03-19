import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/domain/asset.type';
import { Category } from 'src/app/domain/category.type';
import { Symbol } from 'src/app/domain/symbol.type';
import { AssetsRepositoryService } from 'src/app/shared/assets-repository.service';
import { CategoriesRepositoryService } from 'src/app/shared/categories-repository.service';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';
@Injectable({
  providedIn: 'root'
})
export class EditAssetService {
  constructor(
    private router: Router,
    private assetsRepository: AssetsRepositoryService  ,
    private categoriesRepository: CategoriesRepositoryService,
    private symbolsRepository: SymbolsRepositoryService,
    
  ) { }

  loadAsset$(symbol: string): Observable<Asset> {
    return this.assetsRepository.getBySymbol$(symbol);
  }

  loadCategories$(): Observable<Category[]> {
    return this.categoriesRepository.getAll$();
  }

  loadSymbols$(): Observable<Symbol[]> {
    return this.symbolsRepository.getSymbols$();
  }

  updateAsset(asset: Asset): void {
    this.assetsRepository.put$(asset);
  }
  
  deleteAsset(symbol: string): void {
    this.assetsRepository.delete$(symbol);
    this.router.navigate(['/']);
  }
} 