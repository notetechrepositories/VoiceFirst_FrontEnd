import { TestBed } from '@angular/core/testing';

import { SystemtypeService } from './systemtype.service';

describe('SystemtypeService', () => {
  let service: SystemtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
