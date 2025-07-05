import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive     // ⬅️  necesario para routerLinkActive="active"
} from '@angular/router';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {}
