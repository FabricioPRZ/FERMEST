import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { CardSensoresComponent } from "../../../Docente/components/card-sensores/card-sensores.component";
import { NotificationService1 } from '../../../Docente/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-principal-page-student',
  standalone: true,
  imports: [CardSensoresComponent],
  templateUrl: './principal-page-student.component.html',
  styleUrl: './principal-page-student.component.scss'
})
export class PrincipalPageStudentComponent implements OnInit, OnDestroy {
  private historyMap: { [sensorName: string]: { date: Date, value: string } } = {
    'Temperatura': { date: new Date(), value: '27 °C' },
    'Alcohol': { date: new Date(), value: '0.45 ppm' },
    'pH': { date: new Date(), value: '6.8' },
    'Turbidez': { date: new Date(), value: '12 NTU' },
    'Conductividad': { date: new Date(), value: '1200 mS/cm' },
  };

  sensorValues: { [sensorName: string]: string } = {
    'Temperatura': '27 °C',
    'Alcohol': '0.45 ppm',
    'pH': '6.8',
    'Turbidez': '12 NTU',
    'Conductividad': '1200 mS/cm',
  };

  recentHistory: { sensorName: string, date: string, value: string }[] = [];

  private wsSub!: Subscription;

  constructor(
    private notificationService1: NotificationService1,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.recentHistory = Object.entries(this.historyMap).map(([sensorName, { date, value }]) => ({
      sensorName,
      date: date.toISOString().split('T')[0],
      value
    }));

    this.wsSub = this.notificationService1.listenForNotifications().subscribe({
      next: (data: any) => {
        this.zone.run(() => {
          const now = new Date();
          console.log('📩 Datos WebSocket (estudiante):', data);

          if ('temperature' in data) {
            const value = `${data.temperature} °C`;
            this.historyMap['Temperatura'] = { date: now, value };
            this.sensorValues['Temperatura'] = value;
          }
          if ('alcohol_concentration' in data) {
            const value = `${data.alcohol_concentration} ppm`;
            this.historyMap['Alcohol'] = { date: now, value };
            this.sensorValues['Alcohol'] = value;
          }
          if ('ph_value' in data) {
            const value = `${data.ph_value}`;
            this.historyMap['pH'] = { date: now, value };
            this.sensorValues['pH'] = value;
          }
          if ('turbidity' in data) {
            const value = `${data.turbidity} NTU`;
            this.historyMap['Turbidez'] = { date: now, value };
            this.sensorValues['Turbidez'] = value;
          }
          if ('conductivity' in data) {
            const value = `${data.conductivity} mS/cm`;
            this.historyMap['Conductividad'] = { date: now, value };
            this.sensorValues['Conductividad'] = value;
          }

          this.recentHistory = Object.entries(this.historyMap).map(([sensorName, { date, value }]) => ({
            sensorName,
            date: date.toISOString().split('T')[0],
            value
          }));
        });
      },
      error: (err) => console.error('❌ WebSocket error (student):', err),
      complete: () => console.log('✅ WebSocket cerrado (student)')
    });
  }

  ngOnDestroy(): void {
    if (this.wsSub) this.wsSub.unsubscribe();
  }
}
