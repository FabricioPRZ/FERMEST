import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductivityChartComponent } from './conductivity-chart.component';

describe('ConductivityChartComponent', () => {
  let component: ConductivityChartComponent;
  let fixture: ComponentFixture<ConductivityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductivityChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConductivityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
