import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { LogedHeaderComponent } from "../../../components/loged-header/loged-header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, LogedHeaderComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
