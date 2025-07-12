import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-admin',
  imports: [CommonModule],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss'
})
export class SidebarAdminComponent {

  constructor(public router: Router, public route: ActivatedRoute) {}
  
  goToInicio(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-administrador/inicio']);
  }
  
  goToSensores(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-administrador/sensores']);
  }

  goToAddUser(event: Event) {
    event.preventDefault();
    this.router.navigate(['/dashboard-administrador/add-user']);
  }
  
  isActive(path: string): boolean {
    // Compara la ruta actual con el path recibido
    return this.router.url.startsWith(path);
  }
}
