/**
 * Currency trading asset (fiat or crypto)
 */
export type Currency = {
  symbol: string; // Trading symbol (e.g., USD, EUR, BTC)
  name: string; // Full name of the currency
  type: CurrencyType; // Fiat or Crypto
  category: CurrencyCategory; // Classification of the currency
  price: number; // Price in USD
  change: number; // Price change in USD
  changesPercentage: number; // Percentage change
  timestamp: number; // Last update timestamp
  marketCap?: number; // Market capitalization (mainly for crypto)
  volume24h: number; // 24-hour trading volume
  yearHigh: number; // 52-week high
  yearLow: number; // 52-week low
  circulatingSupply?: number; // Current supply in circulation (mainly for crypto)
  maxSupply?: number; // Maximum possible supply (mainly for crypto)
};

/**
 * Type of currency
 */
export enum CurrencyType {
  FIAT = 'Fiat',
  CRYPTO = 'Cryptocurrency'
}

/**
 * Currency categories
 */
export enum CurrencyCategory {
  // Fiat categories
  MAJOR = 'Major',
  MINOR = 'Minor',
  EXOTIC = 'Exotic',
  
  // Crypto categories
  LAYER1 = 'Layer 1',
  LAYER2 = 'Layer 2',
  DEFI = 'DeFi',
  STABLECOIN = 'Stablecoin',
  MEME = 'Meme'
} 