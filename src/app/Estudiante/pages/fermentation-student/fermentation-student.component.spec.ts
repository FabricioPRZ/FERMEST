import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermentationStudentComponent } from './fermentation-student.component';

describe('FermentationStudentComponent', () => {
  let component: FermentationStudentComponent;
  let fixture: ComponentFixture<FermentationStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermentationStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FermentationStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
