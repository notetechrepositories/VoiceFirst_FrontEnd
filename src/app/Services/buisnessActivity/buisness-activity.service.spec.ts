import { TestBed } from '@angular/core/testing';

import { BuisnessActivityService } from './buisness-activity.service';

describe('BuisnessActivityService', () => {
  let service: BuisnessActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuisnessActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
