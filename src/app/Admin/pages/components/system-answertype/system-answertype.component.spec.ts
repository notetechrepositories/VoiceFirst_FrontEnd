import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAnswertypeComponent } from './system-answertype.component';

describe('SystemAnswertypeComponent', () => {
  let component: SystemAnswertypeComponent;
  let fixture: ComponentFixture<SystemAnswertypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemAnswertypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SystemAnswertypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
