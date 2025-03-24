import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRoleComponent } from './company-role.component';

describe('CompanyRoleComponent', () => {
  let component: CompanyRoleComponent;
  let fixture: ComponentFixture<CompanyRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
