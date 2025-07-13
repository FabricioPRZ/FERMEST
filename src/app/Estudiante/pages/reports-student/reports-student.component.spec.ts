import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsStudentComponent } from './reports-student.component';

describe('ReportsStudentComponent', () => {
  let component: ReportsStudentComponent;
  let fixture: ComponentFixture<ReportsStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
