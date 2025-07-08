import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent {
  azucarInicial = 0;
  etanolSensor = 0;

  get eficiencia(): number {
    if (this.azucarInicial <= 0 || this.etanolSensor < 0) return 0;
    const etanolTeorico = this.azucarInicial * 0.51;
    const eficiencia = (this.etanolSensor / etanolTeorico) * 100;
    return Math.min(100, Number(eficiencia.toFixed(2)));
  }

  getBarColor(valor: number): string {
    if (valor < 50) return '#ff5252';      // rojo
    if (valor < 80) return '#ffca28';      // amarillo
    return '#4caf50';                      // verde
  }
}
