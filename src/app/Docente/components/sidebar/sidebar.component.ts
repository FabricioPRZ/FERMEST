import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(public router: Router, public route: ActivatedRoute) {}

  goToInicio(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-docente/inicio']);
  }
  goToEstadisticas(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-docente/statistics']);
  }
  goToSensores(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-docente/sensores']);
  }
  goToHistorial(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-docente/history']);
  }
  goToCalculos(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-docente/calculator']);
  }
  goToFermentation(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-docente/fermentation']);
  }

  goToReports(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-docente/reports']);
  }

  isActive(path: string): boolean {
    // Compara la ruta actual con el path recibido
    return this.router.url.startsWith(path);
  }
}
