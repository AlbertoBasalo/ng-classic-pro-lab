import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, tap } from 'rxjs';
import { CurrencyType } from '../domain/currency.type';
import { Symbol } from '../domain/symbol.type';
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

  private getCryptoSymbols$(): Observable<Symbol[]> {
    return this.currenciesRepository.getAll$().pipe(
      map((currencies) =>
        currencies
          .filter((c) => c.type === CurrencyType.CRYPTO)
          .map((c) => ({ name: c.symbol, categoryId: 1 }))
      )
    );
  }

  private getRealStateSymbols$(): Observable<Symbol[]> {
    return of([{ name: 'FLAT', categoryId: 2 }, { name: 'HOUSE', categoryId: 2 }, { name: 'LAND', categoryId: 2 }]);
  }

  private getCommoditySymbols$(): Observable<Symbol[]> {
    return this.commoditiesRepository
      .getAll$()
      .pipe(
        map((commodities) =>
          commodities.map((c) => ({
            name: c.symbol,
            categoryId: 3,
          }))
        )
      );
  }

  private getStockSymbols$(): Observable<Symbol[]> {
    return this.stocksRepository
      .getCompanies$()
      .pipe(
        map((companies) =>
          companies.map((c) => ({ name: c.symbol, categoryId: 4 }))
        )
      );
  }

  private getCashSymbols$(): Observable<Symbol[]> {
    return this.currenciesRepository.getAll$().pipe(
      map((currencies) =>
        currencies
          .filter((c) => c.type === CurrencyType.FIAT)
          .map((c) => ({ name: c.symbol, categoryId: 6 }))
      )
    );
  }

  public getSymbols$(): Observable<Symbol[]> {
    return forkJoin([
      this.getCryptoSymbols$(),
      this.getRealStateSymbols$(),
      this.getCommoditySymbols$(),
      this.getStockSymbols$(),
      this.getCashSymbols$(),
    ]).pipe(
      map((symbolArrays) => symbolArrays.flat()),
      tap((symbols) => console.log(symbols))
    );
  }

  public getSymbolsByCategory$(categoryId: number): Observable<Symbol[]> {
    return this.getSymbols$().pipe(
      map((symbols) => symbols.filter((s) => s.categoryId === categoryId))
    );
  }
} 