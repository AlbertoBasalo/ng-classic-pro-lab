import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Commodity, CommodityCategory } from '../domain/commodity.type';

@Injectable({
  providedIn: 'root',
})
export class CommoditiesRepositoryService {
  private commodities: Commodity[] = [
    {
      symbol: 'XAU',
      name: 'Gold',
      category: CommodityCategory.PRECIOUS_METALS,
      unit: 'troy ounce',
      price: 2372.50,
      change: 15.30,
      changesPercentage: 0.65,
      timestamp: Date.now(),
      yearHigh: 2431.60,
      yearLow: 1810.80,
      volume: 234567,
    },
    {
      symbol: 'XAG',
      name: 'Silver',
      category: CommodityCategory.PRECIOUS_METALS,
      unit: 'troy ounce',
      price: 28.15,
      change: 0.45,
      changesPercentage: 1.62,
      timestamp: Date.now(),
      yearHigh: 30.25,
      yearLow: 22.10,
      volume: 156789,
    },
    {
      symbol: 'URA',
      name: 'Uranium',
      category: CommodityCategory.ENERGY,
      unit: 'pound',
      price: 65.75,
      change: 1.25,
      changesPercentage: 1.94,
      timestamp: Date.now(),
      yearHigh: 70.50,
      yearLow: 45.20,
      volume: 89012,
    },
    {
      symbol: 'AL',
      name: 'Aluminum',
      category: CommodityCategory.INDUSTRIAL_METALS,
      unit: 'metric ton',
      price: 2285.50,
      change: -15.75,
      changesPercentage: -0.68,
      timestamp: Date.now(),
      yearHigh: 2875.25,
      yearLow: 2150.00,
      volume: 123456,
    },
    {
      symbol: 'CL',
      name: 'Crude Oil',
      category: CommodityCategory.ENERGY,
      unit: 'barrel',
      price: 82.45,
      change: 1.20,
      changesPercentage: 1.48,
      timestamp: Date.now(),
      yearHigh: 95.30,
      yearLow: 65.15,
      volume: 345678,
    },
    {
      symbol: 'NG',
      name: 'Natural Gas',
      category: CommodityCategory.ENERGY,
      unit: 'MMBtu',
      price: 1.85,
      change: -0.05,
      changesPercentage: -2.63,
      timestamp: Date.now(),
      yearHigh: 3.75,
      yearLow: 1.60,
      volume: 234567,
    },
    {
      symbol: 'CU',
      name: 'Copper',
      category: CommodityCategory.INDUSTRIAL_METALS,
      unit: 'metric ton',
      price: 9245.75,
      change: 85.25,
      changesPercentage: 0.93,
      timestamp: Date.now(),
      yearHigh: 9850.00,
      yearLow: 7950.25,
      volume: 178901,
    },
    {
      symbol: 'ZW',
      name: 'Wheat',
      category: CommodityCategory.AGRICULTURE,
      unit: 'bushel',
      price: 5.95,
      change: -0.08,
      changesPercentage: -1.33,
      timestamp: Date.now(),
      yearHigh: 7.85,
      yearLow: 5.25,
      volume: 145678,
    },
    {
      symbol: 'ZC',
      name: 'Corn',
      category: CommodityCategory.AGRICULTURE,
      unit: 'bushel',
      price: 4.38,
      change: 0.03,
      changesPercentage: 0.69,
      timestamp: Date.now(),
      yearHigh: 5.45,
      yearLow: 3.85,
      volume: 167890,
    },
    {
      symbol: 'PL',
      name: 'Platinum',
      category: CommodityCategory.PRECIOUS_METALS,
      unit: 'troy ounce',
      price: 925.80,
      change: 7.50,
      changesPercentage: 0.82,
      timestamp: Date.now(),
      yearHigh: 1050.25,
      yearLow: 850.75,
      volume: 89012,
    },
  ];

  /**
   * Get all available commodities
   */
  public getAll$(): Observable<Commodity[]> {
    return of(this.commodities);
  }

  /**
   * Get commodities by category
   */
  public getByCategory$(category: CommodityCategory): Observable<Commodity[]> {
    return of(this.commodities.filter(c => c.category === category));
  }

  /**
   * Get a specific commodity by symbol
   */
  public getBySymbol$(symbol: string): Observable<Commodity | undefined> {
    return of(this.commodities.find(c => c.symbol === symbol));
  }
} 