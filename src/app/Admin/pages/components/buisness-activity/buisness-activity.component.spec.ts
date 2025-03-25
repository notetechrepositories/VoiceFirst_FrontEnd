import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuisnessActivityComponent } from './buisness-activity.component';

describe('BuisnessActivityComponent', () => {
  let component: BuisnessActivityComponent;
  let fixture: ComponentFixture<BuisnessActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuisnessActivityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuisnessActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
