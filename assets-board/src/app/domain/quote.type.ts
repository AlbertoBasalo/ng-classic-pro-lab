/**
 * Stock quote
 */
export type Quote = {
  symbol: string; // Symbol of the stock
  name: string; // Name of the stock
  price: number; // Stock price in USD
  changesPercentage: number; // Percentage change in price
  change: number; // Price change in USD
  marketCap: number; // Market capitalization in USD
  timestamp: number; // Timestamp of the quote in milliseconds
};
