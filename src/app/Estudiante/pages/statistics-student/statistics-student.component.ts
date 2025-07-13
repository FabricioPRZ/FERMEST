import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
  NavigationEnd
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-statistics-student',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive],
  templateUrl: './statistics-student.component.html',
  styleUrl: './statistics-student.component.scss'
})
export class StatisticsStudentComponent implements OnInit {
  currentSensorTitle: string = 'Datos de Temperatura';
  
  private sensorTitles: { [key: string]: string } = {
    'temperatura': 'Datos de Temperatura',
    'alcohol': 'Datos de Alcohol',
    'ph': 'Datos de pH',
    'turbidez': 'Datos de Turbidez',
    'conductividad': 'Datos de Conductividad'
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateTitleFromRoute(this.router.url);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateTitleFromRoute(event.urlAfterRedirects);
    });
  }

  private updateTitleFromRoute(url: string): void {
    const segments = url.split('/');
    const sensorName = segments[segments.length - 1];
    
    if (this.sensorTitles[sensorName]) {
      this.currentSensorTitle = this.sensorTitles[sensorName];
    } else {
      this.currentSensorTitle = 'Datos de Temperatura';
    }
  }

  setSensorTitle(sensorKey: string): void {
    if (this.sensorTitles[sensorKey]) {
      this.currentSensorTitle = this.sensorTitles[sensorKey];
    }
  }
}
