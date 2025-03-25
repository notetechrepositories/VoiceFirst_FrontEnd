import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBuisnessActivityComponent } from './company-buisness-activity.component';

describe('CompanyBuisnessActivityComponent', () => {
  let component: CompanyBuisnessActivityComponent;
  let fixture: ComponentFixture<CompanyBuisnessActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyBuisnessActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyBuisnessActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
