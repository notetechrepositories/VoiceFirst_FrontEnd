import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionDetailsComponent } from './section-details.component';

describe('SectionDetailsComponent', () => {
  let component: SectionDetailsComponent;
  let fixture: ComponentFixture<SectionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
