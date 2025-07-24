import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlCardComponent } from '../../components/control-card/control-card.component';
import { HistoryCardComponent } from '../../components/history-card/history-card.component';
import { SensorStateService, DeviceId } from '../../services/sensor-state.service';
import { CommandService } from '../../services/command.service';
import { Subscription } from 'rxjs';
import { CardSensoresComponent } from "../../components/card-sensores/card-sensores.component";
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { NotificationService1 } from '../../services/notification.service';

@Component({
  selector: 'app-principal-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ControlCardComponent, HistoryCardComponent, CardSensoresComponent],
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.scss']
})
export class PrincipalPageComponent implements OnInit, OnDestroy {
  private historyMap: { [sensorName: string]: { date: Date, value: string } } = {
    'Temperatura': { date: new Date('2025-07-01'), value: '27 °C' },
    'Alcohol': { date: new Date('2025-07-01'), value: '0.45 ppm' },
    'pH': { date: new Date('2025-06-30'), value: '6.8' },
    'Turbidez': { date: new Date('2025-06-30'), value: '12 NTU' },
    'Conductividad': { date: new Date('2025-06-29'), value: '1200 mS/cm' },
  };

  sensorValues: { [sensorName: string]: string } = {
    'Temperatura': '27 °C',
    'Alcohol': '0.45 ppm',
    'pH': '6.8',
    'Turbidez': '12 NTU',
    'Conductividad': '1200 mS/cm',
  };

  recentHistory: { sensorName: string, date: string, value: string }[] = [];

  devicesPreview = [
    { id: 'sensores', title: 'Manipulación de sensores', description: 'Controla todos los sensores en general.' },
    { id: 'bomba', title: 'Manipulación de bomba', description: 'Controla la bomba de agua.' },
    { id: 'motor', title: 'Manipulación de motor', description: 'Controla el motor principal.' },
  ];

  private sub!: Subscription;
  private wsSub!: Subscription;
  sensorStates: Record<DeviceId, boolean> = {} as any;

  constructor(
    private router: Router,
    private cmd: CommandService,
    private sensorState: SensorStateService,
    private notificationService: NotificationService,
    private notificationService1: NotificationService1,
    private zone: NgZone
  ) {
    this.notificationService.showToast('Mensaje de éxito', 'success');

    this.notificationService.addNotification({
      title: 'Alerta importante',
      message: 'Se ha detectado un problema en el sistema',
      type: 'error',
      route: '/dashboard/alerts'
    });
  }

  ngOnInit(): void {
    this.recentHistory = Object.entries(this.historyMap).map(([sensorName, { date, value }]) => ({
      sensorName,
      date: date.toISOString().split('T')[0],
      value
    }));

    this.sub = this.sensorState.observe(states => {
      this.sensorStates = states;
    });

    this.wsSub = this.notificationService1.listenForNotifications().subscribe({
      next: (data: any) => {
        this.zone.run(() => {
          const now = new Date();
          console.log('🎯 Datos recibidos WS:', data);

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
      error: (err) => console.error('Error en WS:', err),
      complete: () => console.log('WS cerrado')
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.wsSub.unsubscribe();
  }

  isChecked(device: string): boolean {
    return this.sensorStates[device as DeviceId];
  }

  onToggle(event: { device: string; on: boolean }): void {
    const device = event.device as DeviceId;

    if (device === 'sensores') {
      this.sensorState.set('sensores', event.on);
      const sensores: DeviceId[] = ['alcohol', 'temperatura', 'ph', 'turbidez', 'conductividad'];
      sensores.forEach(d => this.sensorState.set(d, event.on));
      this.cmd.switch('sensores', event.on);
    } else {
      this.sensorState.set(device, event.on);
      this.cmd.switch(device, event.on);

      if (this.sensorState.get('sensores') && !event.on) {
        this.sensorState.set('sensores', false);
      }
    }
  }

  sendToViewMore(event: Event) {
    event.preventDefault();
    this.router.navigate(['dashboard-docente/sensores']);
  }
}
