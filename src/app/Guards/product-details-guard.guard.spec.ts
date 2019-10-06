import { TestBed, async, inject } from '@angular/core/testing';

import { ProductDetailsGuardGuard } from './product-details-guard.guard';

describe('ProductDetailsGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDetailsGuardGuard]
    });
  });

  it('should ...', inject([ProductDetailsGuardGuard], (guard: ProductDetailsGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
