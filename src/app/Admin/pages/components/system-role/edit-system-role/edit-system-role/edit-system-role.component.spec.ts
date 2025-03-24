import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSystemRoleComponent } from './edit-system-role.component';

describe('EditSystemRoleComponent', () => {
  let component: EditSystemRoleComponent;
  let fixture: ComponentFixture<EditSystemRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSystemRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSystemRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
