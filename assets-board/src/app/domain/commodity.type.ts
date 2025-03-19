/**
 * Commodity trading asset
 */
export type Commodity = {
  symbol: string; // Trading symbol
  name: string; // Full name of the commodity
  category: CommodityCategory; // Category of commodity
  unit: string; // Unit of measurement (e.g., troy ounce, metric ton)
  price: number; // Current price in USD
  change: number; // Price change in USD
  changesPercentage: number; // Percentage change
  timestamp: number; // Last update timestamp
  yearHigh: number; // 52-week high
  yearLow: number; // 52-week low
  volume: number; // Trading volume
};

/**
 * Main commodity categories
 */
export enum CommodityCategory {
  PRECIOUS_METALS = 'Precious Metals',
  ENERGY = 'Energy',
  INDUSTRIAL_METALS = 'Industrial Metals',
  AGRICULTURE = 'Agriculture'
} 