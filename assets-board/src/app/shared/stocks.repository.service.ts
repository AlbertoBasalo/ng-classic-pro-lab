import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../domain/company.type';
import { Quote } from '../domain/quote.type';

@Injectable({
  providedIn: 'root',
})
export class StocksRepositoryService {
  private companies: Company[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      sector: 'Technology',
      subSector: 'Consumer Electronics',
      headQuarter: 'Cupertino, California',
      dateFirstAdded: '1980-12-12',
      cik: '0000320193',
      founded: '1976',
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      sector: 'Technology',
      subSector: 'Software',
      headQuarter: 'Redmond, Washington',
      dateFirstAdded: '1986-03-13',
      cik: '0000789019',
      founded: '1975',
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      sector: 'Technology',
      subSector: 'Internet Services',
      headQuarter: 'Mountain View, California',
      dateFirstAdded: '2004-08-19',
      cik: '0001652044',
      founded: '1998',
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      sector: 'Consumer Cyclical',
      subSector: 'Internet Retail',
      headQuarter: 'Seattle, Washington',
      dateFirstAdded: '1997-05-15',
      cik: '0001018724',
      founded: '1994',
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      sector: 'Technology',
      subSector: 'Semiconductors',
      headQuarter: 'Santa Clara, California',
      dateFirstAdded: '1999-01-22',
      cik: '0001045810',
      founded: '1993',
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      sector: 'Technology',
      subSector: 'Social Media',
      headQuarter: 'Menlo Park, California',
      dateFirstAdded: '2012-05-18',
      cik: '0001326801',
      founded: '2004',
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      sector: 'Automotive',
      subSector: 'Electric Vehicles',
      headQuarter: 'Austin, Texas',
      dateFirstAdded: '2010-06-29',
      cik: '0001318605',
      founded: '2003',
    },
    {
      symbol: 'JPM',
      name: 'JPMorgan Chase & Co.',
      sector: 'Financial Services',
      subSector: 'Banks',
      headQuarter: 'New York City, New York',
      dateFirstAdded: '1969-03-04',
      cik: '0000019617',
      founded: '1871',
    },
    {
      symbol: 'V',
      name: 'Visa Inc.',
      sector: 'Financial Services',
      subSector: 'Payment Services',
      headQuarter: 'San Francisco, California',
      dateFirstAdded: '2008-03-19',
      cik: '0001403161',
      founded: '1958',
    },
    {
      symbol: 'WMT',
      name: 'Walmart Inc.',
      sector: 'Consumer Defensive',
      subSector: 'Retail',
      headQuarter: 'Bentonville, Arkansas',
      dateFirstAdded: '1972-08-25',
      cik: '0000104169',
      founded: '1962',
    },
  ];

  private quotes: Record<string, Quote> = {
    AAPL: {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 172.45,
      changesPercentage: 0.85,
      change: 1.45,
      marketCap: 2690000000000,
      timestamp: Date.now(),
    },
    MSFT: {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 417.88,
      changesPercentage: 1.25,
      change: 5.17,
      marketCap: 3100000000000,
      timestamp: Date.now(),
    },
    GOOGL: {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 2825.15,
      changesPercentage: 0.55,
      change: 15.55,
      marketCap: 2500000000000,
      timestamp: Date.now(),
    },
    AMZN: {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 3450.75,
      changesPercentage: 0.35,
      change: 11.95,
      marketCap: 1700000000000,
      timestamp: Date.now(),
    },
    NVDA: {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 545.25,
      changesPercentage: 0.25,
      change: 1.35,
      marketCap: 1200000000000,
      timestamp: Date.now(),
    },
    META: {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 325.45,
      changesPercentage: 0.45,
      change: 1.45,
      marketCap: 1500000000000,
      timestamp: Date.now(),
    },
    TSLA: {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 850.75,
      changesPercentage: 0.35,
      change: 2.95,
      marketCap: 1000000000000,
      timestamp: Date.now(),
    },
    JPM: {
      symbol: 'JPM',
      name: 'JPMorgan Chase & Co.',
      price: 172.45,
      changesPercentage: 0.85,
      change: 1.45,
      marketCap: 2690000000000,
      timestamp: Date.now(),
    },
    V: {
      symbol: 'V',
      name: 'Visa Inc.',
      price: 282.45,
      changesPercentage: 0.55,
      change: 1.45,
      marketCap: 2690000000000,
      timestamp: Date.now(),
    },
    WMT: {
      symbol: 'WMT',
      name: 'Walmart Inc.',
      price: 172.45,
      changesPercentage: 0.85,
      change: 1.45,
      marketCap: 2690000000000,
      timestamp: Date.now(),
    },
    IBM: {
      symbol: 'IBM',
      name: 'International Business Machines Corporation',
      price: 172.45,
      changesPercentage: 0.85,
      change: 1.45,
      marketCap: 2690000000000,
      timestamp: Date.now(),
    },  
  };

  /**
   * Get all available companies
   */
  public getCompanies$(): Observable<Company[]> {
    return of(this.companies);
  }

  /**
   * Get a specific quote by symbol with its value at a given timestamp
   */
  public getQuote$(symbol: string): Observable<Quote | undefined> {
    return of(this.quotes[symbol]);
  }
}
