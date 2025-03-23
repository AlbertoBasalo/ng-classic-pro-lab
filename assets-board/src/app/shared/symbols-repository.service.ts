import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { CategorySymbolVO } from '../domain/category-symbol-vo.type';
import { Currency, CurrencyType } from '../domain/currency.type';
import { Quote } from '../domain/quote.type';
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
          .filter((c: Currency) => c.type === CurrencyType.CRYPTO)
          .map((c: Currency) => ({ symbol: c.symbol, categoryId: 1, categoryName: 'Crypto', value: c.price }))
      )
    );
  }

  private getRealStateSymbols$(): Observable<CategorySymbolVO[]> {
    return of([{ symbol: 'FLAT', categoryId: 2, categoryName: 'RealState', value: 100000 }, { symbol: 'HOUSE', categoryId: 2, categoryName: 'RealState', value: 200000 }, { symbol: 'LAND', categoryId: 2, categoryName: 'RealState', value: 300000 }]);
  }

  private getBondsSymbols$(): Observable<CategorySymbolVO[]> {
    return of([{ symbol: 'USTBILL', categoryId: 5, categoryName: 'Bonds', value: 100000 }, { symbol: 'ETF', categoryId: 5, categoryName: 'Bonds', value: 200000 }]);
  }

  private getCommoditySymbols$(): Observable<CategorySymbolVO[]> {
    return this.commoditiesRepository
      .getAll$()
      .pipe(
        map((commodities) =>
          commodities.map((c) => ({
            symbol: c.symbol,
            categoryId: 3,
            categoryName: 'Commodities',
            value: c.price
          }))
        )
      );
  }

  private getStockSymbols$(): Observable<CategorySymbolVO[]> {
    return this.stocksRepository
      .getQuotes$()
      .pipe(
        map((quote) =>
          quote.map((q: Quote) => ({ symbol: q.symbol, categoryId: 4, categoryName: 'Stocks', value: q.price }))
        )
      );
  }

  private getCashSymbols$(): Observable<CategorySymbolVO[]> {
    return this.currenciesRepository.getAll$().pipe(
      map((currencies) =>
        currencies
          .filter((c) => c.type === CurrencyType.FIAT)
          .map((c) => ({ symbol: c.symbol, categoryId: 6, categoryName: 'Cash', value: c.price }))
      )
    );
  }

  public getSymbols$(): Observable<CategorySymbolVO[]> {
    return forkJoin([
      this.getCryptoSymbols$(),
      this.getRealStateSymbols$(),
      this.getCommoditySymbols$(),
      this.getStockSymbols$(),
      this.getBondsSymbols$(),
      this.getCashSymbols$(),
    ]).pipe(
      map((symbolArrays) => symbolArrays.flat())
    );
  }

  public getSymbolsByCategory$(categoryId: number): Observable<CategorySymbolVO[]> {
    return this.getSymbols$().pipe(
      map((symbols) => symbols.filter((s) => s.categoryId === categoryId))
    );
  }

  public getSymbolsBySearchTerm$(searchTerm : string): Observable<CategorySymbolVO[]> {
    return this.getSymbols$().pipe(
      map((symbols) => this.findBySearchTerm(symbols, searchTerm))
    );
  }

  private findBySearchTerm(symbols: CategorySymbolVO[], searchTerm: string): CategorySymbolVO[] {
    const searchTermLower = searchTerm.toLowerCase();
    return symbols.filter((s) => {
      const symbolLower = s.symbol.toLowerCase();
      const categoryNameLower = s.categoryName.toLowerCase();
      return symbolLower.includes(searchTermLower) || categoryNameLower.includes(searchTermLower);
    });
  }
} 