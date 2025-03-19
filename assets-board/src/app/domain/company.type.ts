/**
 * Company listed on a stock exchange
 */
export type Company = {
  symbol: string; // Symbol of the company
  name: string; // Name of the company
  sector: string; // Sector of the company
  subSector: string; // Subsector of the company
  headQuarter: string; // Headquarter of the company
  dateFirstAdded: string; // Date when the company was first added to the stock exchange
  cik: string; // CIK of the company
  founded: string; // Year when the company was founded
};
