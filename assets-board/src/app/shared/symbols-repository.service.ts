import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { CurrencyType } from '../domain/currency.type';
import { Symbol, SymbolCategory } from '../domain/symbol.type';
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
          .map((c) => ({ name: c.symbol, category: SymbolCategory.CRYPTO }))
      )
    );
  }

  private getCommoditySymbols$(): Observable<Symbol[]> {
    return this.commoditiesRepository
      .getAll$()
      .pipe(
        map((commodities) =>
          commodities.map((c) => ({
            name: c.symbol,
            category: SymbolCategory.COMMODITIES,
          }))
        )
      );
  }

  private getStockSymbols$(): Observable<Symbol[]> {
    return this.stocksRepository
      .getCompanies$()
      .pipe(
        map((companies) =>
          companies.map((c) => ({ name: c.symbol, category: SymbolCategory.STOCKS }))
        )
      );
  }

  private getCashSymbols$(): Observable<Symbol[]> {
    return this.currenciesRepository.getAll$().pipe(
      map((currencies) =>
        currencies
          .filter((c) => c.type === CurrencyType.FIAT)
          .map((c) => ({ name: c.symbol, category: SymbolCategory.CASH }))
      )
    );
  }

  public getSymbols$(): Observable<Symbol[]> {
    return forkJoin([
      this.getCryptoSymbols$(),
      this.getCommoditySymbols$(),
      this.getStockSymbols$(),
      this.getCashSymbols$(),
    ]).pipe(map((symbolArrays) => symbolArrays.flat()));
  }

  public getSymbolsByCategory$(categoryId: SymbolCategory): Observable<Symbol[]> {
    return this.getSymbols$().pipe(
      map((symbols) => symbols.filter((s) => s.category === categoryId))
    );
  }
} 