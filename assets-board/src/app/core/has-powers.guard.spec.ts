import { TestBed } from '@angular/core/testing';

import { HasPowersGuard } from './has-powers.guard';

describe('HasPowersGuard', () => {
  let guard: HasPowersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasPowersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
