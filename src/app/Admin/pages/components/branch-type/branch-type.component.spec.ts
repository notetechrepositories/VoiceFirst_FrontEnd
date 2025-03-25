import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTypeComponent } from './branch-type.component';

describe('BranchTypeComponent', () => {
  let component: BranchTypeComponent;
  let fixture: ComponentFixture<BranchTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
