import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-conductivity-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  template: `<div echarts [options]="chartOptions" class="chart"></div>`,
  styleUrls: ['./conductivity-chart.component.scss']
})
export class ConductivityChartComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  private labels: string[] = [];
  private values: number[] = [];

  chartOptions: any = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', boundaryGap: false, data: [] },
    yAxis: { type: 'value', name: 'mS/cm' },
    series: [{
      name: 'Conductividad',
      type: 'line',
      stack: 'total',
      areaStyle: { color: 'rgba(255,87,34,0.25)' },
      lineStyle: { color: '#ff5722' },
      itemStyle: { color: '#ff5722' },
      data: []
    }]
  };

  constructor(private notifService: NotificationService) {}

  ngOnInit(): void {

    this.sub = this.notifService.listenForNotifications().subscribe((msg: any) => {
      if (msg.sensor === 'conductividad') {
        const time = new Date().toLocaleTimeString('es-MX', { hour12: false });
        this.labels.push(time);
        this.values.push(msg.value);

        // Solo conservar los últimos 20 datos
        if (this.labels.length > 20) {
          this.labels.shift();
          this.values.shift();
        }

        // Actualizar gráfico
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
