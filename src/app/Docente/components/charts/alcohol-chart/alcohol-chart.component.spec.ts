import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholChartComponent } from './alcohol-chart.component';

describe('AlcoholChartComponent', () => {
  let component: AlcoholChartComponent;
  let fixture: ComponentFixture<AlcoholChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlcoholChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlcoholChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
