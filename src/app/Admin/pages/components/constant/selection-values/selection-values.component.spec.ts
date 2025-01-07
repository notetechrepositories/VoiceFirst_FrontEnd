import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionValuesComponent } from './selection-values.component';

describe('SelectionValuesComponent', () => {
  let component: SelectionValuesComponent;
  let fixture: ComponentFixture<SelectionValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectionValuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectionValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
