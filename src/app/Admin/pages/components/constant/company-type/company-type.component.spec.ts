import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypeComponent } from './company-type.component';

describe('CompanyTypeComponent', () => {
  let component: CompanyTypeComponent;
  let fixture: ComponentFixture<CompanyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
