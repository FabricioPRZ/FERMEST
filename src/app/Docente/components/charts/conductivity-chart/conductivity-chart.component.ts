import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Subscription } from 'rxjs';
import { NotificationService1 } from '../../../services/notification.service';

@Component({
  selector: 'app-conductivity-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  styleUrls: ['./conductivity-chart.component.scss'],
  templateUrl: './conductivity-chart.component.html',
})
export class ConductivityChartComponent implements OnInit, OnDestroy {
  private sub!: Subscription;

  public labels: string[] = [];
  public values: number[] = [];
  public lastValue: number = 0;
  public lastUpdate: string = '';
  private chartInstance: any;

  chartOptions: any = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const value = params[0].value;
        const time = params[0].axisValue;
        return `${time}<br/>Conductividad: ${value} mS/cm`;
      }
    },
    xAxis: { type: 'category', boundaryGap: false, data: [] },

    yAxis: { type: 'value', name: 'TDS (mg/L)', min: 0, max: 10 },
    series: [{
      name: 'Conductividad',
      type: 'line',
      smooth: true,
      areaStyle: { color: 'rgba(255,87,34,0.25)' },
      lineStyle: { color: '#ff5722', width: 3 },
      itemStyle: { color: '#ff5722' },
      data: []
    }]
  };

  updateOptions: any = {};

  constructor(
    private notifService: NotificationService1,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    console.log('🚀 Componente de conductividad iniciado');

    this.sub = this.notifService.listenForNotifications().subscribe((msg: any) => {
      console.log('📩 Mensaje recibido para conductividad:', msg);

      const conductivity = msg.conductivity;

      if (typeof conductivity === 'number') {
        const time = new Date().toLocaleTimeString('es-MX', { hour12: false });
        this.addDataPoint(conductivity, time);
      } else {
        console.warn('⚠️ Conductividad no es número:', conductivity);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  }

  onChartInit(chart: any): void {
    this.chartInstance = chart;
    console.log('📊 Gráfico de conductividad inicializado:', this.chartInstance);
  }

  private addDataPoint(conductivity: number, tiempo: string): void {
    this.labels.push(tiempo);
    this.values.push(conductivity);
    this.lastValue = conductivity;
    this.lastUpdate = new Date().toLocaleTimeString();

    if (this.labels.length > 20) {
      this.labels.shift();
      this.values.shift();
    }

    console.log('📊 Datos de conductividad actualizados:', {
      labels: this.labels,
      values: this.values,
      labelsLength: this.labels.length,
      valuesLength: this.values.length
    });

    this.updateOptions = {
      xAxis: { data: [...this.labels] },
      series: [{ data: [...this.values] }]
    };

    if (this.chartInstance) {
      try {
        this.chartInstance.setOption({
          xAxis: { data: [...this.labels] },
          series: [{ data: [...this.values] }]
        });
        console.log('✅ Gráfico de conductividad actualizado via instancia');
      } catch (error) {
        console.error('❌ Error actualizando gráfico de conductividad:', error);
      }
    }

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: { ...this.chartOptions.xAxis, data: [...this.labels] },
      series: [{ ...this.chartOptions.series[0], data: [...this.values] }]
    };

    this.cdr.detectChanges();
    console.log('🔄 Detección de cambios forzada para conductividad');
  }
}
