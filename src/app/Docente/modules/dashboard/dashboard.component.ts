import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { LogedHeaderComponent } from "../../../components/loged-header/loged-header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, LogedHeaderComponent, RouterOutlet, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(public router: Router) {}

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

  isActive(path: string): boolean {
    return this.router.url.startsWith(path);
  }
}
