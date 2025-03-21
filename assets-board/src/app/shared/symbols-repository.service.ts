import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { CategorySymbolVO } from '../domain/category-symbol-vo.type';
import { CurrencyType } from '../domain/currency.type';
import { CommoditiesRepositoryService } from './commodities-repository.service';
import { CurrenciesRepositoryService } from './currencies-repository.service';
import { StocksRepositoryService } from './stocks.repository.service';

@Injectable({
  providedIn: 'root',
})
export class SymbolsRepositoryService {
  constructor(
    private commoditiesRepository: CommoditiesRepositoryService,
    private currenciesRepository: CurrenciesRepositoryService,
    private stocksRepository: StocksRepositoryService
  ) {}

  private getCryptoSymbols$(): Observable<CategorySymbolVO[]> {
    return this.currenciesRepository.getAll$().pipe(
      map((currencies) =>
        currencies
          .filter((c) => c.type === CurrencyType.CRYPTO)
          .map((c) => ({ symbol: c.symbol, categoryId: 1 }))
      )
    );
  }

  private getRealStateSymbols$(): Observable<CategorySymbolVO[]> {
    return of([{ symbol: 'FLAT', categoryId: 2 }, { symbol: 'HOUSE', categoryId: 2 }, { symbol: 'LAND', categoryId: 2 }]);
  }

  private getCommoditySymbols$(): Observable<CategorySymbolVO[]> {
    return this.commoditiesRepository
      .getAll$()
      .pipe(
        map((commodities) =>
          commodities.map((c) => ({
            symbol: c.symbol,
            categoryId: 3,
          }))
        )
      );
  }

  private getStockSymbols$(): Observable<CategorySymbolVO[]> {
    return this.stocksRepository
      .getCompanies$()
      .pipe(
        map((companies) =>
          companies.map((c) => ({ symbol: c.symbol, categoryId: 4 }))
        )
      );
  }

  private getCashSymbols$(): Observable<CategorySymbolVO[]> {
    return this.currenciesRepository.getAll$().pipe(
      map((currencies) =>
        currencies
          .filter((c) => c.type === CurrencyType.FIAT)
          .map((c) => ({ symbol: c.symbol, categoryId: 6 }))
      )
    );
  }

  public getSymbols$(): Observable<CategorySymbolVO[]> {
    return forkJoin([
      this.getCryptoSymbols$(),
      this.getRealStateSymbols$(),
      this.getCommoditySymbols$(),
      this.getStockSymbols$(),
      this.getCashSymbols$(),
    ]).pipe(
      map((symbolArrays) => symbolArrays.flat()),
    );
  }

  public getSymbolsByCategory$(categoryId: number): Observable<CategorySymbolVO[]> {
    return this.getSymbols$().pipe(
      map((symbols) => symbols.filter((s) => s.categoryId === categoryId))
    );
  }
} 