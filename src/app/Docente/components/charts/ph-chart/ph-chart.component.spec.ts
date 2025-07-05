import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhChartComponent } from './ph-chart.component';

describe('PhChartComponent', () => {
  let component: PhChartComponent;
  let fixture: ComponentFixture<PhChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
