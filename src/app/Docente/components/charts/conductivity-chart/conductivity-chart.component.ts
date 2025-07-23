import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-conductivity-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  styleUrls: ['./conductivity-chart.component.scss'],
  templateUrl: './conductivity-chart.component.html',
})
export class ConductivityChartComponent implements OnInit, OnDestroy {
  private intervalId: any;
  private labels: string[] = [];
  private values: number[] = [];
  private simulatedTime = 0; // minutos simulados desde el inicio

  chartOptions: any = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', boundaryGap: false, data: [] },
    yAxis: { type: 'value', name: 'TDS (mg/L)', min: 0, max: 10 },
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

  ngOnInit(): void {
    // Inicializar con 20 valores simulados para evitar gráfico vacío
    for (let i = 0; i < 20; i++) {
      this.labels.push(this.getCurrentTimeMinusSeconds((20 - i) * 1));
      this.values.push(this.simulateFermentation(i));
    }

    this.setChartOptions();

    this.intervalId = setInterval(() => {
      this.simulatedTime++;

      const time = new Date().toLocaleTimeString('es-MX', { hour12: false });
      const value = this.simulateFermentation(this.simulatedTime);

      this.labels.push(time);
      this.values.push(value);

      if (this.labels.length > 20) {
        this.labels.shift();
        this.values.shift();
      }

      this.setChartOptions();
    }, 1000); // Actualiza cada segundo
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  setChartOptions(): void {
    this.chartOptions = {
      ...this.chartOptions,
      xAxis: { ...this.chartOptions.xAxis, data: [...this.labels] },
      series: [{ ...this.chartOptions.series[0], data: [...this.values] }]
    };
  }

  simulateFermentation(minute: number): number {
    // Simulación de conductividad TDS (mg/L) en fermentación:
    // Fase 1 (0-10 min): aumento gradual con ruido pequeño
    // Fase 2 (10-30 min): meseta con fluctuaciones leves
    // Fase 3 (>30 min): ligera disminución o estabilización

    if (minute < 10) {
      return parseFloat((1 + 0.5 * minute + Math.random() * 0.3).toFixed(2)); // crece linealmente con ruido
    } else if (minute < 30) {
      return parseFloat((6 + (Math.random() - 0.5) * 0.5).toFixed(2)); // meseta ±0.25
    } else {
      return parseFloat((5.5 + (Math.random() - 0.5) * 0.3).toFixed(2)); // estabilización
    }
  }

  private getCurrentTimeMinusSeconds(secondsAgo: number): string {
    const date = new Date(Date.now() - secondsAgo * 1000);
    return date.toLocaleTimeString('es-MX', { hour12: false });
  }
}
