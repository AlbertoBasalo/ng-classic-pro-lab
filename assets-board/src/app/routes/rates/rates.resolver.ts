import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { OpenExRatesRepository, Rates } from 'src/app/shared/rates.service';

@Injectable({
  providedIn: 'root'
})
export class RatesResolver implements Resolve<Rates> {

  constructor(private ratesService: OpenExRatesRepository) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Rates> {
    return this.ratesService.getRates$()
      .pipe(
        tap(() => console.log('Resolving rates')),
      );
  }
}
