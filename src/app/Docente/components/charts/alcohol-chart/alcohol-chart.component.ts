import { Component } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alcohol-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  template: `<div echarts [options]="chartOptions" class="chart"></div>`,
  styleUrls: ['./alcohol-chart.component.scss']
})
export class AlcoholChartComponent {
  readonly chartOptions = {
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 15,
      axisLine: {
        lineStyle: {
          color: [[1, '#ff9800']], // color del borde del medidor
          width: 12
        }
      },
      pointer: {
        itemStyle: {
          color: '#ff5722' // color de la aguja
        }
      },
      detail: {
        color: '#ff5722' // texto del valor
      },
      data: [{ value: 5.6, name: 'Alcohol' }]
    }]
  };
}
