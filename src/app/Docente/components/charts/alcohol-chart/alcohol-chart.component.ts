import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-alcohol-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  styleUrls: ['./alcohol-chart.component.scss'],
  templateUrl: './alcohol-chart.component.html',
})
export class AlcoholChartComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  private previousAlcohol: number = 30; // Valor inicial dentro del rango razonable g/L
  private intervalId: any;

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
        return `${time}<br/>Alcohol: ${value.toFixed(2)} g/L`;
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      name: 'g/L',
      min: 0,
      max: 50
    },
    series: [{
      name: 'Alcohol',
      type: 'line',
      smooth: true,
      areaStyle: { color: 'rgba(255, 152, 0, 0.3)' },
      lineStyle: { color: '#FF9800', width: 3 },
      itemStyle: { color: '#FF9800' },
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
    console.log('📊 Gráfico de alcohol inicializado:', this.chartInstance);
  }

  addTestData(): void {
    // Variación leve ±1.5 g/L
    const variation = (Math.random() - 0.5) * 3; // [-1.5, +1.5]
    let testAlcohol = this.previousAlcohol + variation;

    // Limitar a rango 20–40 g/L para fermentación típica
    testAlcohol = Math.max(20, Math.min(40, testAlcohol));

    const testTime = new Date().toLocaleTimeString('es-MX', { hour12: false });

    console.log('🧪 Agregando dato de prueba de alcohol:', {
      alcohol: testAlcohol.toFixed(2),
      tiempo: testTime
    });

    this.previousAlcohol = testAlcohol;
    this.addDataPoint(testAlcohol, testTime);
  }

  private addDataPoint(alcohol: number, tiempo: string): void {
    this.labels.push(tiempo);
    this.values.push(alcohol);
    this.lastValue = alcohol;
    this.lastUpdate = new Date().toLocaleTimeString();

    // Limitar datos a los últimos 20 puntos
    if (this.labels.length > 20) {
      this.labels.shift();
      this.values.shift();
    }

    console.log('📊 Datos de alcohol actualizados:', {
      labels: this.labels,
      values: this.values,
      labelsLength: this.labels.length,
      valuesLength: this.values.length
    });

    // Actualizar gráfica via instancia si disponible
    if (this.chartInstance) {
      try {
        this.chartInstance.setOption({
          xAxis: { data: [...this.labels] },
          series: [{ data: [...this.values] }]
        });
        console.log('✅ Gráfico de alcohol actualizado via instancia');
      } catch (error) {
        console.error('❌ Error actualizando gráfico de alcohol via instancia:', error);
      }
    }

    // Actualizar opciones para binding Angular
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

    console.log('🔄 Detección de cambios forzada para alcohol');
  }

  ngOnInit(): void {
    console.log('🚀 Componente de alcohol iniciado');

    this.sub = this.notifService.listenForNotifications().subscribe((msg: any) => {
      console.log('📩 Mensaje recibido para alcohol:', msg);

      const alcohol = msg.alcohol ?? msg.data?.alcohol;

      if (typeof alcohol === 'number') {
        const time = new Date().toLocaleTimeString('es-MX', { hour12: false });
        this.addDataPoint(alcohol, time);
      } else {
        console.warn('⚠️ Alcohol no es número:', alcohol);
      }
    });

    // Iniciar simulación continua cada 3 segundos
    this.intervalId = setInterval(() => {
      this.addTestData();
    }, 3000);
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
