import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermentationFormComponent } from './fermentation-form.component';

describe('FermentationFormComponent', () => {
  let component: FermentationFormComponent;
  let fixture: ComponentFixture<FermentationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermentationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FermentationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
