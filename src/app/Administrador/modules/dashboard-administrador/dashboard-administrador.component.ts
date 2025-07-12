import { Component } from '@angular/core';
import { LogedHeaderComponent } from "../../../components/loged-header/loged-header.component";
import { SidebarAdminComponent } from '../../components/sidebar-admin/sidebar-admin.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-administrador',
  imports: [LogedHeaderComponent, SidebarAdminComponent, RouterOutlet],
  templateUrl: './dashboard-administrador.component.html',
  styleUrl: './dashboard-administrador.component.scss'
})
export class DashboardAdministradorComponent {

}
