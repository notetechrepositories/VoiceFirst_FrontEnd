import { TestBed } from '@angular/core/testing';

import { SubSectionService } from './sub-section.service';

describe('SubSectionService', () => {
  let service: SubSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
