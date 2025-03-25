import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemRoleComponent } from './add-system-role.component';

describe('AddSystemRoleComponent', () => {
  let component: AddSystemRoleComponent;
  let fixture: ComponentFixture<AddSystemRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSystemRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSystemRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
