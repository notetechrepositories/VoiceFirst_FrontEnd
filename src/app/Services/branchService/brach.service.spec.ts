import { TestBed } from '@angular/core/testing';

import { BrachService } from './brach.service';

describe('BrachService', () => {
  let service: BrachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
