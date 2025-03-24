import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRoleComponent } from './system-role.component';

describe('SystemRoleComponent', () => {
  let component: SystemRoleComponent;
  let fixture: ComponentFixture<SystemRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
