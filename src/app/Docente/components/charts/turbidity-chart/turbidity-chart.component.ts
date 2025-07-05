import { Component } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turbidity-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  template: `<div echarts [options]="chartOptions" class="chart"></div>`,
  styleUrls: ['./turbidity-chart.component.scss']
})
export class TurbidityChartComponent {
  readonly chartOptions = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['08 h','10 h','12 h','14 h','16 h'] },
    yAxis: { type: 'value', name: 'NTU' },
    series: [{
      type: 'bar',
      data: [3, 4, 7, 6, 5],
      itemStyle: {
        color: '#3f51b5',       // color de las barras
        borderRadius: [6, 6, 0, 0]
      }
    }]
  };
}
