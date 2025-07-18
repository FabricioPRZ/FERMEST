import { Component, OnInit } from '@angular/core';
import { FermentationFormComponent } from '../../components/fermentation-form/fermentation-form.component';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Fermentation } from '../../../interfaces/fermentation';
import { FermentationService } from '../../../services/fermentation/fermentation.service';

@Component({
  selector: 'app-fermentation',
  imports: [CommonModule, NgClass, DatePipe, FermentationFormComponent],
  templateUrl: './fermentation.component.html',
  styleUrls: ['./fermentation.component.scss'],
  standalone: true,
})
export class FermentationComponent implements OnInit {
  fermentations: Fermentation[] = [];
  showModal = false;

  constructor(private fermentationService: FermentationService) {}

  ngOnInit(): void {
    this.loadFermentations();
  }

  loadFermentations(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.fermentationService.getAll(userId).subscribe({
      next: (data) => {
        this.fermentations = data ?? [];
      },
      error: (err) => console.error('Error al obtener fermentaciones', err),
    });
  }

  calcStatus(f: Fermentation): string {
    const endDate = new Date(f.started_at);
    endDate.setHours(endDate.getHours() + f.duration_hours);
    return new Date() > endDate ? 'finalizado' : 'en proceso';
  }

  getStatusClass(status?: string): string {
    if (!status) return '';
    return {
      finalizado: 'status-finalizado',
      'en proceso': 'status-en-proceso',
      pendiente: 'status-pendiente',
    }[status.toLowerCase()] || '';
  }

  handleSubmit(formData: Fermentation): void {
    // Asignar operator_id desde localStorage
    const operatorId = Number(localStorage.getItem('userId'));

    if (!operatorId || !formData.started_at || !formData.duration_hours || !formData.raw_material) {
      console.error('Faltan campos obligatorios');
      return;
    }

    formData.operator_id = operatorId;

    // Asegurarse que started_at sea string ISO
    if (typeof formData.started_at === 'object' && formData.started_at !== null && (formData.started_at as Date).toISOString !== undefined) {
      formData.started_at = (formData.started_at as Date).toISOString();
    } else if (typeof formData.started_at === 'string') {
      formData.started_at = new Date(formData.started_at).toISOString();
    }

    console.log('Datos a enviar:', formData);

    this.fermentationService.create(formData).subscribe({
      next: () => {
        this.loadFermentations();
        this.closeModal();
      },
      error: (err) => console.error('Error al registrar fermentación', err),
    });
  }

  registerFermentation(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
