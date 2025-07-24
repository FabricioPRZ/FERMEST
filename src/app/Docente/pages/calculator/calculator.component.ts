import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationService1 } from '../../services/notification.service';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']  // Nota que era styleUrls, no styleUrl
})
export class CalculatorComponent implements OnInit, OnDestroy {
  azucarInicial = 0;
  etanolSensor = 0;

  private wsSub!: Subscription;

  constructor(private notificationService1: NotificationService1) {}

  ngOnInit(): void {
    this.wsSub = this.notificationService1.listenForNotifications().subscribe({
      next: (data: any) => {
        if (typeof data.alcohol_concentration === 'number') {
          this.etanolSensor = data.alcohol_concentration;
        }
      },
      error: (err) => {
        console.error('Error en WS:', err);
      },
      complete: () => {
        console.log('WebSocket cerrado');
      }
    });
  }

  ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
  }

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
