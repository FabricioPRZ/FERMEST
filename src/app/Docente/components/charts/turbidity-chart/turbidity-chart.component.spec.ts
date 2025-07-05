import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurbidityChartComponent } from './turbidity-chart.component';

describe('TurbidityChartComponent', () => {
  let component: TurbidityChartComponent;
  let fixture: ComponentFixture<TurbidityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurbidityChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurbidityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
