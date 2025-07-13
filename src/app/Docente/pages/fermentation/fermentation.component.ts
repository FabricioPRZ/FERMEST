import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fermentation',
  imports: [CommonModule],
  templateUrl: './fermentation.component.html',
  styleUrl: './fermentation.component.scss'
})
export class FermentationComponent {
  fermentations = [
    {
      name: 'Lote A',
      startDate: new Date('2025-07-10T08:30:00'),
      duration: '72 horas',
      status: 'en proceso',
    },
    {
      name: 'Lote B',
      startDate: new Date('2025-07-05T14:00:00'),
      duration: '48 horas',
      status: 'finalizado',
    },
    {
      name: 'Lote C',
      startDate: new Date('2025-07-12T09:00:00'),
      duration: 'Pendiente',
      status: 'pendiente',
    },
  ];

  registerFermentation(): void {
    alert('Función de registrar fermentación aún no implementada (pendiente datos)');
    // Aquí se abriría un modal o se navega a una vista/formulario en el futuro.
  }

  getStatusClass(status: string): string {
    return {
      'finalizado': 'status-finalizado',
      'en proceso': 'status-en-proceso',
      'pendiente': 'status-pendiente',
    }[status.toLowerCase()] || '';
  }
}
