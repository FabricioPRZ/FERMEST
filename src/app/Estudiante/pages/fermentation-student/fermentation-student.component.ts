import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fermentation-student',
  imports: [CommonModule],
  templateUrl: './fermentation-student.component.html',
  styleUrl: './fermentation-student.component.scss'
})
export class FermentationStudentComponent {
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

  getStatusClass(status: string): string {
    return {
      'finalizado': 'status-finalizado',
      'en proceso': 'status-en-proceso',
      'pendiente': 'status-pendiente',
    }[status.toLowerCase()] || '';
  }
}
