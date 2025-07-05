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

  goToInicio() {
    this.router.navigate(['/dashboard-docente/inicio']);
  }
  goToEstadisticas() {
    this.router.navigate(['/dashboard-docente/statistics']);
  }
  goToSensores() {
    this.router.navigate(['/dashboard-docente/sensores']);
  }
  goToHistorial() {
    this.router.navigate(['/dashboard-docente/history']);
  }
  goToCalculos() {
    this.router.navigate(['/dashboard-docente/calculos']);
  }
  goToFermentacion() {
    this.router.navigate(['/dashboard-docente/fermentacion']);
  }

  isActive(path: string): boolean {
    // Compara la ruta actual con el path recibido
    return this.router.url.startsWith(path);
  }
}
