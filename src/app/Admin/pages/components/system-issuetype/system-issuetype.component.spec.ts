import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemIssuetypeComponent } from './system-issuetype.component';

describe('SystemIssuetypeComponent', () => {
  let component: SystemIssuetypeComponent;
  let fixture: ComponentFixture<SystemIssuetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemIssuetypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemIssuetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
