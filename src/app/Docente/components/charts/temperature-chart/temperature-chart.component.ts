import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { Subscription } from 'rxjs';
import { NotificationService1 } from '../../../services/notification.service';

@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  styleUrls: ['./temperature-chart.component.scss'],
  templateUrl: './temperature-chart.component.html'
})
export class TemperatureChartComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  
  public labels: string[] = [];
  public values: number[] = [];
  public lastValue: number = 0;
  public lastUpdate: string = '';

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
    private notifService: NotificationService1,
    private cdr: ChangeDetectorRef
  ) {}
ngOnInit(): void {
  console.log('🚀 Componente iniciado');

  this.sub = this.notifService.listenForNotifications().subscribe((msg: any) => {
    console.log('📩 Mensaje recibido:', msg);

    const temperatura = msg.temperature;

    if (typeof temperatura === 'number') {
      const time = new Date().toLocaleTimeString('es-MX', { hour12: false });
      this.addDataPoint(temperatura, time);
    } else {
      console.warn('⚠️ Temperatura no es número:', temperatura);
    }
  });

  setTimeout(() => {
    this.addTestData();
    setTimeout(() => this.addTestData(), 1000);
    setTimeout(() => this.addTestData(), 2000);
  }, 1000);
}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onChartInit(chart: any): void {
    console.log('📊 Gráfico inicializado:', chart);
  }

  addTestData(): void {
    const testTemp = Math.random() * 30 + 15;
    const testTime = new Date().toLocaleTimeString('es-MX', { hour12: false });
    console.log('🧪 Agregando dato de prueba:', { temperatura: testTemp, tiempo: testTime });
    this.addDataPoint(testTemp, testTime);
  }

  private addDataPoint(temperatura: number, tiempo: string): void {
    this.labels.push(tiempo);
    this.values.push(temperatura);
    this.lastValue = temperatura;
    this.lastUpdate = new Date().toLocaleTimeString();

    if (this.labels.length > 20) {
      this.labels.shift();
      this.values.shift();
    }

    this.updateOptions = {
      xAxis: { data: [...this.labels] },
      series: [{ data: [...this.values] }]
    };
  }
}
