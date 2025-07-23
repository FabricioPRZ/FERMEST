import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { max, min } from 'rxjs';

@Component({
  selector: 'app-ph-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  styleUrls: ['./ph-chart.component.scss'],
  templateUrl: './ph-chart.component.html',
})
export class PhChartComponent implements OnInit, OnDestroy {
  labels: string[] = [];
  data: number[] = [];

  private intervalId: any;
  private previousPh: number = 5.5; // valor inicial
  private counter: number = 1;

  chartOptions: any;

  ngOnInit(): void {
    this.labels = [];
    this.data = [];

    // Generar primeros puntos
    for (let i = 0; i < 6; i++) {
      this.addTestData();
    }

    // Iniciar simulación continua
    this.intervalId = setInterval(() => {
      this.addTestData();
    }, 5000); // cada 5 segundos
  }

  addTestData(): void {
    // Simular descenso suave del pH
    const variation = (Math.random() - 0.8) * 0.1; // sesgado hacia valores más bajos
    let newPh = this.previousPh + variation;
    newPh = Math.max(3.5, Math.min(7, newPh)); // mantener rango de fermentación

    const label = `D${this.counter++}`;
    this.labels.push(label);
    this.data.push(parseFloat(newPh.toFixed(2)));
    this.previousPh = newPh;

    // Limitar a los últimos 20 puntos
    if (this.data.length > 20) {
      this.labels.shift();
      this.data.shift();
    }

    this.updateChart();
  }

  updateChart(): void {
    this.chartOptions = {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: this.labels },
      yAxis: { type: 'value', name: 'pH', min: 0, max: 14 },
      series: [
        {
          name: 'pH',
          type: 'scatter',
          symbolSize: 12,
          itemStyle: {
            color: '#8bc34a'
          },
          data: this.data
        },
        {
          type: 'line',
          data: this.data,
          smooth: true,
          lineStyle: {
            color: '#558b2f',
            width: 2
          }
        }
      ]
    };
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}