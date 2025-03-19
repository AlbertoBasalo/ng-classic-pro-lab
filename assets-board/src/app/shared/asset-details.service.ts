import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CommoditiesRepositoryService } from './commodities-repository.service';
import { CurrenciesRepositoryService } from './currencies-repository.service';
import { StocksRepositoryService } from './stocks.repository.service';

@Injectable({
  providedIn: 'root',
})
export class AssetDetailsService {
  constructor(
    private commoditiesRepository: CommoditiesRepositoryService,
    private currenciesRepository: CurrenciesRepositoryService,
    private stocksRepository: StocksRepositoryService
  ) {}

  /**
   * Get asset details based on category and symbol
   * @param categoryId The category ID of the asset
   * @param symbol The symbol of the asset
   * @returns Observable with detailed asset information
   */
  public getAssetDetails$(categoryId: number, symbol: string): Observable<any> {
    switch (categoryId) {
      case 1: // Crypto
        return this.currenciesRepository.getBySymbol$(symbol);
      case 2: // Real Estate
        // For real estate, return static data for now
        return of(this.getRealEstateDetails(symbol));
      case 3: // Commodities
        return this.commoditiesRepository.getBySymbol$(symbol);
      case 4: // Stocks
        return this.stocksRepository.getQuote$(symbol);
      case 6: // Cash/Currency
        return this.currenciesRepository.getBySymbol$(symbol);
      default:
        return of(null);
    }
  }

  private getRealEstateDetails(symbol: string): any {
    // Mock data for real estate assets
    const realEstateData: Record<string, any> = {
      'FLAT': {
        type: 'Apartment',
        estimatedRent: 0.05,
        taxRate: 0.0125
      },
      'HOUSE': {
        type: 'Single Family Home',
        estimatedRent: 0.05,
        taxRate: 0.0110
      },
      'COMM': {
        type: 'Commercial',
        estimatedRent: 0.05,
        taxRate: 0.0135
      },
      'SHOP': {
        type: 'Commercial',
        estimatedRent: 0.05,
        taxRate: 0.0135
      },
      'OFFICE': {
        type: 'Commercial',
        estimatedRent: 0.05,
        taxRate: 0.0135
      },
      'INDUSTRY': {
        type: 'Commercial',
        estimatedRent: 0.05,
        taxRate: 0.0135
      },
      'HOTEL': {
        type: 'Commercial',
        estimatedRent: 0.05,
        taxRate: 0.0135
      },
      'LAND': {
        type: 'Agricultural',
        estimatedRent: 0.05,
        taxRate: 0.0135
      }
    };
    
    return realEstateData[symbol] || { 
      note: 'Detailed information not available for this property',
      symbol: symbol
    };
  }
} 