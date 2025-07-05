import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  template: `<div echarts [options]="chartOptions" class="chart"></div>`,
  styleUrls: ['./temperature-chart.component.scss']
})
export class TemperatureChartComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  private labels: string[] = [];
  private values: number[] = [];

  chartOptions: any = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', boundaryGap: false, data: [] },
    yAxis: { type: 'value', name: '°C' },
    series: [{
      name: 'Temp.',
      type: 'line',
      smooth: true,
      areaStyle: { color: 'rgba(23,147,178,0.3)' },
      lineStyle: { color: '#1793b2', width: 3 },
      itemStyle: { color: '#1793b2' },
      data: []
    }]
  };

  constructor(private notifService: NotificationService) {}

  ngOnInit(): void {
    this.notifService.connect();

    this.sub = this.notifService.listenForNotifications().subscribe((msg: any) => {
      if (msg.sensor === 'temperatura') {
        const time = new Date().toLocaleTimeString('es-MX', { hour12: false });
        this.labels.push(time);
        this.values.push(msg.value);

        if (this.labels.length > 20) {
          this.labels.shift();
          this.values.shift();
        }

        this.chartOptions = {
          ...this.chartOptions,
          xAxis: { data: this.labels },
          series: [{ ...this.chartOptions.series[0], data: this.values }]
        };
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
