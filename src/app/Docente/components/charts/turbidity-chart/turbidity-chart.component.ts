import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Subscription } from 'rxjs';
import { NotificationService1 } from '../../../services/notification.service';

@Component({
  selector: 'app-turbidity-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  styleUrls: ['./turbidity-chart.component.scss'],
  templateUrl: './turbidity-chart.component.html'
})
export class TurbidityChartComponent implements OnInit, OnDestroy {
  private sub!: Subscription;

  public labels: string[] = [];
  public values: number[] = [];

  chartOptions: any = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: []
    },
    yAxis: {
      type: 'value',
      name: 'NTU',
      min: 0
    },
    series: [
      {
        type: 'bar',
        data: [],
        itemStyle: {
          color: '#3f51b5',
          borderRadius: [6, 6, 0, 0]
        }
      }
    ]
  };

  constructor(
    private notifService: NotificationService1,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('🚀 Componente de turbidez iniciado');

    this.sub = this.notifService.listenForNotifications().subscribe((msg: any) => {
      console.log('📩 Mensaje recibido del WS:', msg);

      const turbidity = msg.turbidity;

      if (typeof turbidity === 'number') {
        const time = new Date().toLocaleTimeString('es-MX', { hour12: false });
        this.addDataPoint(turbidity, time);
      } else {
        console.warn('⚠️ Turbidez no es número:', turbidity);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private addDataPoint(value: number, time: string): void {
    this.labels.push(time);
    this.values.push(value);

    if (this.labels.length > 20) {
      this.labels.shift();
      this.values.shift();
    }

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: { data: [...this.labels] },
      series: [{ ...this.chartOptions.series[0], data: [...this.values] }]
    };

    this.cdr.detectChanges();
  }
}
