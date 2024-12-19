import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Division2Component } from './division2.component';

describe('Division2Component', () => {
  let component: Division2Component;
  let fixture: ComponentFixture<Division2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Division2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Division2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
