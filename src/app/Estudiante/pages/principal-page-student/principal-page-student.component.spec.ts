import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalPageStudentComponent } from './principal-page-student.component';

describe('PrincipalPageStudentComponent', () => {
  let component: PrincipalPageStudentComponent;
  let fixture: ComponentFixture<PrincipalPageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalPageStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalPageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
