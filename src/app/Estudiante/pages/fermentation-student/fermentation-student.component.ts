import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FermentationService } from '../../../services/fermentation/fermentation.service';
import { Fermentation } from '../../../interfaces/fermentation';

@Component({
  selector: 'app-fermentation-student',
  imports: [CommonModule],
  templateUrl: './fermentation-student.component.html',
  styleUrl: './fermentation-student.component.scss'
})

export class FermentationStudentComponent implements OnInit {
  fermentations: Fermentation[] = [];
  loading = false;
  error = '';

  constructor(private fermentationService: FermentationService) {}

  ngOnInit(): void {
    this.loadFermentations();
  }

  loadFermentations(): void {
    const userId = Number(localStorage.getItem('userId'));

    if (!userId) {
      this.error = 'ID de usuario no encontrado en localStorage';
      return;
    }

    this.loading = true;
    this.fermentationService.getAll(userId).subscribe({
      next: (data) => {
        this.fermentations = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar fermentaciones:', err);
        this.error = 'Error al cargar fermentaciones';
        this.loading = false;
      },
    });
  }

  getStatusClass(status?: string): string {
    if (!status) return '';
    return {
      'finalizado': 'status-finalizado',
      'en proceso': 'status-en-proceso',
      'pendiente': 'status-pendiente',
    }[status.toLowerCase()] || '';
  }
}
