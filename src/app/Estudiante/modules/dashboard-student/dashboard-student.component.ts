import { Component } from '@angular/core';
import { LogedHeaderComponent } from "../../../components/loged-header/loged-header.component";
import { SidebarStudentComponent } from "../../components/sidebar-student/sidebar-student.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-student',
  imports: [LogedHeaderComponent, SidebarStudentComponent, RouterOutlet],
  templateUrl: './dashboard-student.component.html',
  styleUrl: './dashboard-student.component.scss'
})
export class DashboardStudentComponent {

}
