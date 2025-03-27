import { RatesComponent } from './rates.component';
import { ratesResolver } from './rates.resolver';

export default [
  { 
    path: '', 
    component: RatesComponent,
    resolve: {
      rates: ratesResolver
    }
  }
];
