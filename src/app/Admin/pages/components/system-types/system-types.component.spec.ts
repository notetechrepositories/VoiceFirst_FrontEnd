import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemTypesComponent } from './system-types.component';

describe('SystemTypesComponent', () => {
  let component: SystemTypesComponent;
  let fixture: ComponentFixture<SystemTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemTypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
