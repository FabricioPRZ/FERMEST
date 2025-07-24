import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Subscription } from 'rxjs';
import { NotificationService1 } from '../../../services/notification.service';

@Component({
  selector: 'app-ph-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  styleUrls: ['./ph-chart.component.scss'],
  templateUrl: './ph-chart.component.html',
})
export class PhChartComponent implements OnInit, OnDestroy {
  private sub!: Subscription;

  public labels: string[] = [];
  public values: number[] = [];

  chartOptions: any = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      name: 'pH',
      min: 0,
      max: 14
    },
    series: [
      {
        name: 'pH',
        type: 'scatter',
        symbolSize: 12,
        itemStyle: {
          color: '#8bc34a' 
        },
        data: []
      },
      {
        name: 'Tendencia',
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#558b2f', 
          width: 2
        },
        data: []
      }
    ]
  };

  constructor(
    private notifService: NotificationService1,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('🚀 Componente de pH iniciado');

    this.sub = this.notifService.listenForNotifications().subscribe((msg: any) => {
      console.log('📩 Mensaje recibido para pH:', msg);

      const ph = msg.ph_value ?? msg.ph;

      console.log('Valor de pH extraído:', ph);

      if (typeof ph === 'number') {
        const time = new Date().toLocaleTimeString('es-MX', { hour12: false });
        this.addDataPoint(ph, time);
      } else {
        console.warn('⚠️ pH no es número:', ph);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private addDataPoint(ph: number, time: string): void {
    this.labels.push(time);
    this.values.push(ph);

    if (this.labels.length > 20) {
      this.labels.shift();
      this.values.shift();
    }

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: { data: [...this.labels] },
      series: [
        { ...this.chartOptions.series[0], data: [...this.values] }, 
        { ...this.chartOptions.series[1], data: [...this.values] }  
      ]
    };

    this.cdr.detectChanges();
  }
}
