import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { tap } from 'rxjs';
import { OpenExRatesRepository, Rates } from 'src/app/shared/rates.service';

export const ratesResolver: ResolveFn<Rates> = () => {
  const ratesService = inject(OpenExRatesRepository);
  
  return ratesService.getRates$().pipe(
    tap(() => console.log('Resolving rates')),
  );
};


