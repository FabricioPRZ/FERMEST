import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FermentationFormComponent } from '../../components/fermentation-form/fermentation-form.component';

@Component({
  selector: 'app-fermentation',
  imports: [CommonModule, FermentationFormComponent],
  templateUrl: './fermentation.component.html',
  styleUrl: './fermentation.component.scss'
})
export class FermentationComponent {
  fermentations: any[] = [];
  showModal = false;

  registerFermentation(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleSubmit(formData: any): void {
    this.fermentations.push({
      name: formData.raw_material,
      startDate: new Date(formData.started_at),
      duration: `${formData.duration_hours} horas`,
      status: 'en proceso'
    });
    this.closeModal();
  }

  getStatusClass(status: string): string {
    return {
      'finalizado': 'status-finalizado',
      'en proceso': 'status-en-proceso',
      'pendiente': 'status-pendiente',
    }[status.toLowerCase()] || '';
  }
}
