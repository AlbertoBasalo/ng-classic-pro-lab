import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommoditiesRepositoryService } from '../commodities-repository.service';
import { CurrenciesRepositoryService } from '../currencies-repository.service';
import { StocksRepositoryService } from '../stocks.repository.service';


@Injectable({
  providedIn: 'root',
})
export class AssetValueService {
  constructor(
    private commoditiesRepository: CommoditiesRepositoryService,
    private currenciesRepository: CurrenciesRepositoryService,
    private stocksRepository: StocksRepositoryService
  ) {}

  /**
   * Get current value for an asset based on category and symbol
   * @param categoryId The category ID of the asset
   * @param symbol The symbol of the asset
   * @returns Observable with the current value
   */
  public getCurrentValue$(categoryId: number, symbol: string): Observable<number> {
    switch (categoryId) {
      case 1: // Crypto
        return this.currenciesRepository.getBySymbol$(symbol).pipe(
          map(currency => currency?.price || 0)
        );
      case 2: // Real Estate
        // Static values for now or could be implemented with a real estate API
        return of(this.getRealEstateValue(symbol));
      case 3: // Commodities
        return this.commoditiesRepository.getBySymbol$(symbol).pipe(
          map(commodity => commodity?.price || 0)
        );
      case 4: // Stocks
        return this.stocksRepository.getQuote$(symbol).pipe(
          map(quote => quote?.price || 0)
        );
      case 6: // Cash/Currency
        return this.currenciesRepository.getBySymbol$(symbol).pipe(
          map(currency => currency?.price || 0)
        );
      default:
        return of(0);
    }
  }

  private getRealEstateValue(symbol: string): number {
    // Mock values for real estate
    const values: Record<string, number> = {
      'FLAT': 1000000,
      'HOUSE': 1500000,
      'LAND': 750000,
      'COMM': 2000000,
      'SHOP': 3000000,
      'OFFICE': 4000000,
      'INDUSTRY': 5000000,
      'HOTEL': 6000000,
      'OTHER': 7000000
    };
    return values[symbol] || 0;
  }
} 