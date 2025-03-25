import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTypeComponent } from './section-type.component';

describe('SectionTypeComponent', () => {
  let component: SectionTypeComponent;
  let fixture: ComponentFixture<SectionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
