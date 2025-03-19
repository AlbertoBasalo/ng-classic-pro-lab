/**
 * Symbol with its category for asset selection
 */
export type Symbol = {
  name: string;
  category: SymbolCategory;
};

/**
 * Categories for symbols
 */
export enum SymbolCategory {
  CRYPTO = 1,
  REAL_STATE = 2,
  COMMODITIES = 3,
  STOCKS = 4,
  BONDS = 5,
  CASH = 6,
} 