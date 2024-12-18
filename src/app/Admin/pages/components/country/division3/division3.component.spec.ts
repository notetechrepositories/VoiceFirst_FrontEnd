import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Division3Component } from './division3.component';

describe('Division3Component', () => {
  let component: Division3Component;
  let fixture: ComponentFixture<Division3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Division3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Division3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
