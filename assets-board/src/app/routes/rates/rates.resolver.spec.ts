import { TestBed } from '@angular/core/testing';

import { RatesResolver } from './rates.resolver';

describe('RatesResolver', () => {
  let resolver: RatesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RatesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
