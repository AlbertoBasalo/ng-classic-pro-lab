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
        address: '123 Broadway, New York, NY',
        type: 'Apartment',
        area: '1,200 sq ft',
        rooms: 3,
        bathrooms: 2,
        yearBuilt: 2010,
        lastAppraisal: 1000000,
        lastAppraisalDate: '2023-01-15',
        estimatedRent: 5000,
        taxRate: 0.0125
      },
      'HOUSE': {
        address: '456 Oak Street, Los Angeles, CA',
        type: 'Single Family Home',
        area: '2,500 sq ft',
        rooms: 4,
        bathrooms: 3.5,
        yearBuilt: 2005,
        landArea: '0.25 acres',
        lastAppraisal: 1750000,
        lastAppraisalDate: '2023-02-20',
        estimatedRent: 8500,
        taxRate: 0.0110
      },
      'COMM': {
        address: '789 Market Street, San Francisco, CA',
        type: 'Commercial',
        area: '5,000 sq ft',
        units: 3,
        yearBuilt: 2000,
        lastAppraisal: 3500000,
        lastAppraisalDate: '2022-11-10',
        annualIncome: 420000,
        occupancyRate: 0.95,
        taxRate: 0.0135
      }
    };
    
    return realEstateData[symbol] || { 
      note: 'Detailed information not available for this property',
      symbol: symbol
    };
  }
} 