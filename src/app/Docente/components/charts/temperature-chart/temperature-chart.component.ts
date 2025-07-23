import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  styleUrls: ['./temperature-chart.component.scss'],
  templateUrl: './temperature-chart.component.html'
})

export class TemperatureChartComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  private previousTemp: number = 25;
  private intervalId: any;


  public labels: string[] = [];
  public values: number[] = [];
  public lastValue: number = 0;
  public lastUpdate: string = '';

  private chartInstance: any;

  chartOptions: any = {
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      name: '°C'
    },
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

  updateOptions: any = {};

  constructor(
    private notifService: NotificationService,
    private cdr: ChangeDetectorRef
  ) { }

  onChartInit(chart: any): void {
    this.chartInstance = chart;
    console.log('📊 Gráfico inicializado:', this.chartInstance);
  }

  addTestData(): void {
    const variation = (Math.random() - 0.5) * 0.6; // [-0.3, +0.3]
    let testTemp = this.previousTemp + variation;

    testTemp = Math.max(24, Math.min(26, testTemp)); // Limitar rango

    const testTime = new Date().toLocaleTimeString('es-MX', { hour12: false });

    console.log('🧪 Agregando dato de prueba:', {
      temperatura: testTemp.toFixed(2),
      tiempo: testTime
    });

    this.previousTemp = testTemp;
    this.addDataPoint(testTemp, testTime);
  }



  private addDataPoint(temperatura: number, tiempo: string): void {
    this.labels.push(tiempo);
    this.values.push(temperatura);
    this.lastValue = temperatura;
    this.lastUpdate = new Date().toLocaleTimeString();

    // Limitar datos
    if (this.labels.length > 20) {
      this.labels.shift();
      this.values.shift();
    }

    console.log('📊 Datos actualizados:', {
      labels: this.labels,
      values: this.values,
      labelsLength: this.labels.length,
      valuesLength: this.values.length
    });

    // Método 1: Usar merge
    this.updateOptions = {
      xAxis: { data: [...this.labels] },
      series: [{ data: [...this.values] }]
    };

    // Método 2: Usar instancia directamente
    if (this.chartInstance) {
      try {
        this.chartInstance.setOption({
          xAxis: { data: [...this.labels] },
          series: [{ data: [...this.values] }]
        });
        console.log('✅ Gráfico actualizado via instancia');
      } catch (error) {
        console.error('❌ Error actualizando via instancia:', error);
      }
    }

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        ...this.chartOptions.xAxis,
        data: [...this.labels]
      },
      series: [{
        ...this.chartOptions.series[0],
        data: [...this.values]
      }]
    };

    // Forzar detección de cambios
    this.cdr.detectChanges();

    console.log('🔄 Detección de cambios forzada');
  }

  ngOnInit(): void {
    console.log('🚀 Componente iniciado');

    this.sub = this.notifService.listenForNotifications().subscribe((msg: any) => {
      console.log('📩 Mensaje recibido:', msg);

      const temperatura = msg.temperatura ?? msg.data?.temperatura;

      if (typeof temperatura === 'number') {
        const time = new Date().toLocaleTimeString('es-MX', { hour12: false });
        this.addDataPoint(temperatura, time);
      } else {
        console.warn('⚠️ Temperatura no es número:', temperatura);
      }
    });

    // Simulación en tiempo real cada 3 segundos
    this.intervalId = setInterval(() => {
      this.addTestData();
    }, 3000); // 3000 ms = 3 s
  }


  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}