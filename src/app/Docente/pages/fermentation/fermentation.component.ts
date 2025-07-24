import { Component, OnInit, OnDestroy } from '@angular/core';
import { FermentationFormComponent } from '../../components/fermentation-form/fermentation-form.component';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Fermentation } from '../../../interfaces/fermentation';
import { FermentationService } from '../../../services/fermentation/fermentation.service';
import { NotificationService1 } from '../../services/notification.service';
import { Subscription } from 'rxjs';
import { WsValuesService } from '../../services/websocket/ws-values.service';
import { ReportService } from '../../services/reporte/report.service';

@Component({
  selector: 'app-fermentation',
  imports: [CommonModule, NgClass, DatePipe, FermentationFormComponent],
  templateUrl: './fermentation.component.html',
  styleUrls: ['./fermentation.component.scss'],
  standalone: true,
})
export class FermentationComponent implements OnInit, OnDestroy {
  fermentations: Fermentation[] = [];
  showModal = false;
  private wsSub!: Subscription;

  constructor(
    private fermentationService: FermentationService,
    private notificationService: NotificationService1,
    private wsValuesService: WsValuesService,
    private reportService: ReportService 
  ) {}

  ngOnInit(): void {
    this.loadFermentations();
    this.listenForWS();
    this.startFermentationWatcher();
  }

  ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
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

  listenForWS(): void {
    this.wsSub = this.notificationService.listenForNotifications().subscribe({
      next: (data) => this.wsValuesService.update(data),
      error: (err) => console.error('WS error:', err),
    });
  }

  startFermentationWatcher(): void {
    const userId = Number(localStorage.getItem('userId'));

    setInterval(() => {
      const now = Date.now();

      this.fermentations.forEach((f) => {
        const start = new Date(f.started_at).getTime();
        const end = start + f.duration_hours * 3600 * 1000;
        const fiveMinutesAfterStart = start + 5 * 60 * 1000; // 5 minutos después de iniciado

        if (f.status?.toLowerCase() === 'iniciado' && now >= fiveMinutesAfterStart && now < end) {
          // Cambiar a 'en proceso' después de 5 minutos
          const updated: Fermentation = {
            ...f,
            status: 'en proceso'
          };

          if (f.id !== undefined) {
            this.fermentationService.update(f.id, userId, updated).subscribe({
              next: () => this.loadFermentations(),
              error: (err) => console.error('Error actualizando fermentación a en proceso:', err)
            });
          }
        } 
        else if (f.status?.toLowerCase() !== 'finalizado' && now >= end) {
          // Cambiar a 'finalizado' y calcular datos
          const values = this.wsValuesService.getValues();
          const etanol = values.alcohol_concentration ?? 0;
          const azucar = f.sugar_concentration ?? 0;
          const tiempo = f.duration_hours;

          const eficiencia = azucar > 0 ? (etanol / (azucar * 0.51)) * 100 : 0;
          const tasa = tiempo > 0 ? etanol / tiempo : 0;

          const updated: Fermentation = {
            ...f,
            ethanol_concentration: etanol,
            final_ph: values.ph_value,
            fermentation_efficiency: eficiencia,
            fermentation_rate: tasa,
            status: 'finalizado'
          };

          if (f.id !== undefined) {
            this.fermentationService.update(f.id, userId, updated).subscribe({
              next: () => this.loadFermentations(),
              error: (err) => console.error('Error actualizando fermentación finalizada:', err)
            });
          }
        }
      });
    }, 10000); // cada 10 segundos
  }

  getStatusClass(status?: string): string {
    if (!status) return '';
    return {
      finalizado: 'status-finalizado',
      'en proceso': 'status-en-proceso',
      iniciado: 'status-iniciado',
      pendiente: 'status-pendiente',
    }[status.toLowerCase()] || '';
  }

  handleSubmit(formData: Fermentation): void {
    const operatorId = Number(localStorage.getItem('userId'));

    if (!operatorId || !formData.started_at || !formData.duration_hours || !formData.raw_material) {
      console.error('Faltan campos obligatorios');
      return;
    }

    formData.operator_id = operatorId;

    // Al registrar, siempre iniciar con status 'iniciado'
    formData.status = 'iniciado';

    if (typeof formData.started_at === 'object' && formData.started_at !== null) {
      formData.started_at = (formData.started_at as Date).toISOString();
    } else if (typeof formData.started_at === 'string') {
      formData.started_at = new Date(formData.started_at).toISOString();
    }

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

  generateReport(f: Fermentation): void {
    this.reportService.generatePDF(f);
  }
}
