import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export type Rates = {
  [key: string]: number;
};

type OpenExResponse = {
  rates: Rates;
};

@Injectable({
  providedIn: 'root',
})
export class OpenExRatesRepository {
  private http = inject(HttpClient);
  private url = `https://openexchangerates.org/api/latest.json`;
  private appId = 'invalid-app-id';
  private params = new HttpParams()
    .set('app_id', this.appId)
    .set('show_alternative', 'true');

  /**
   * Fetches the latest dollar rate for a given currency symbol.
   * @returns The observable of the dollar rates.
   */
  public getRates$(): Observable<Rates> {
    return this.http
      .get<OpenExResponse>(this.url, { params: this.params })
      .pipe(map((data: OpenExResponse) => data.rates));
  }
}
