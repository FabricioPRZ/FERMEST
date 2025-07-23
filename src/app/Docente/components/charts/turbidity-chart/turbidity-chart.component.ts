import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turbidity-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  styleUrls: ['./turbidity-chart.component.scss'],
  templateUrl: './turbidity-chart.component.html'
})
export class TurbidityChartComponent implements OnInit, OnDestroy {
  chartOptions: any;
  intervalId: any;

  xData: string[] = [];
  yData: number[] = [];

  ngOnInit(): void {
    // Inicializar con datos base para evitar gráfico vacío al inicio
    const now = new Date();
    for (let i = 4; i >= 0; i--) {
      const timeLabel = new Date(now.getTime() - i * 3000).toLocaleTimeString('es-MX', { hour12: false });
      this.xData.push(timeLabel);
      this.yData.push(200000 + i * 150000); // Valores iniciales escalonados
    }

    this.setChartOptions();
    this.intervalId = setInterval(() => {
      this.updateChartData();
    }, 3000); // Cada 3 segundos para simular lectura real
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  updateChartData(): void {
    const now = new Date();
    const timeLabel = now.toLocaleTimeString('es-MX', { hour12: false });

    const newValue = this.getNextTurbidityValue(this.yData[this.yData.length - 1]);

    this.xData.push(timeLabel);
    this.yData.push(newValue);

    // Mantener solo últimas 5 etiquetas y valores
    if (this.xData.length > 5) this.xData.shift();
    if (this.yData.length > 5) this.yData.shift();

    this.setChartOptions();
  }

  getNextTurbidityValue(prev: number): number {
    const change = Math.random() * 20000 - 10000; // ±10,000 células/mL
    let next = prev + change;
    if (next < 100000) next = 100000;
    if (next > 1000000) next = 1000000;
    return Math.round(next);
  }

  setChartOptions(): void {
    this.chartOptions = {
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: this.xData
      },
      yAxis: {
        type: 'value',
        name: 'Cel/mL',
        min: 0,
        max: 1100000
      },
      series: [{
        type: 'bar',
        data: this.yData,
        itemStyle: {
          color: '#3f51b5',
          borderRadius: [6, 6, 0, 0]
        }
      }]
    };
  }
}
