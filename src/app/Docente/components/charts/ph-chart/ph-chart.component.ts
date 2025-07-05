import { Component } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ph-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  template: `<div echarts [options]="chartOptions" class="chart"></div>`,
  styleUrls: ['./ph-chart.component.scss']
})
export class PhChartComponent {
  readonly chartOptions = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: ['D1','D2','D3','D4','D5','D6'] },
    yAxis: { type: 'value', name: 'pH' },
    series: [
      {
        name: 'pH',
        type: 'scatter',
        symbolSize: 12,
        itemStyle: {
          color: '#8bc34a' // color de los puntos
        },
        data: [5.2, 4.9, 4.6, 4.4, 4.3, 4.1]
      },
      {
        type: 'line',
        data: [5.2, 4.9, 4.6, 4.4, 4.3, 4.1],
        smooth: true,
        lineStyle: {
          color: '#558b2f', // línea de tendencia
          width: 2
        }
      }
    ]
  };
}
