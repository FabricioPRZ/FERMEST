import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-student',
  imports: [CommonModule],
  templateUrl: './sidebar-student.component.html',
  styleUrl: './sidebar-student.component.scss'
})
export class SidebarStudentComponent {
  constructor(public router: Router, public route: ActivatedRoute) {}
  
  goToInicio(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-estudiante/inicio']);
  }
  
  goToStatistics(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-estudiante/statistics']);
  }

  goToFermentation(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-estudiante/fermentation']);
  }

  goToReports(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-estudiante/reports']);
  }
  
  isActive(path: string): boolean {
    // Compara la ruta actual con el path recibido
    return this.router.url.startsWith(path);
  }
}
