import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ControlCardComponent } from '../../components/control-card/control-card.component';
import { HistoryCardComponent } from '../../components/history-card/history-card.component';
import { CardSensoresComponent } from "../../components/card-sensores/card-sensores.component";

import { SensorStateService, DeviceId } from '../../services/sensor-state.service';
import { CommandService } from '../../services/command.service';
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
  private historyMap: Record<string, { date: Date; value: string }> = {};
  sensorValues: Record<string, string> = {};
  recentHistory: { sensorName: string; date: string; value: string }[] = [];

  devicesPreview = [
    { id: 'sensores', title: 'Manipulación de sensores', description: 'Controla todos los sensores en general.' },
    { id: 'bomba', title: 'Manipulación de bomba', description: 'Controla la bomba de agua.' },
    { id: 'motor', title: 'Manipulación de motor', description: 'Controla el motor principal.' },
  ];

  maxRPM = 8000;
  maxRecordedRPM = 0;
  avgRPM = 0;
  rpmStatus = 'normal';

  gaugeMarks = [
    { angle: 0.25, value: 0, showValue: true },
    { angle: 0.325, value: 2000, showValue: false },
    { angle: 0.4, value: 4000, showValue: true },
    { angle: 0.475, value: 6000, showValue: false },
    { angle: 0.55, value: 8000, showValue: true }
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
  ) {}

  ngOnInit(): void {
    this.sub = this.sensorState.observe(states => {
      this.sensorStates = states;
    });

    this.wsSub = this.notificationService1.listenForNotifications().subscribe({
      next: (data: any) => {
        this.zone.run(() => {
          const now = new Date();
          console.log('🎯 Datos recibidos WS:', data);

          for (const [key, rawValue] of Object.entries(data)) {
            const { normalizedKey, formattedValue } = this.normalizeSensorData(key, rawValue);

            if (!normalizedKey) continue; // ignora campos no reconocidos

            this.sensorValues[normalizedKey] = formattedValue;
            this.historyMap[normalizedKey] = { date: now, value: formattedValue };
          }

          if ('RPM' in this.sensorValues) {
            this.updateRPMStatus();
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

  get rpmPercentage(): number {
    const currentRPM = Number(this.sensorValues['RPM']) || 0;
    return currentRPM / this.maxRPM;
  }

  updateRPMStatus(): void {
    const rpm = Number(this.sensorValues['RPM']) || 0;

    if (rpm > this.maxRPM * 0.8) {
      this.rpmStatus = 'danger';
    } else if (rpm > this.maxRPM * 0.6) {
      this.rpmStatus = 'warning';
    } else {
      this.rpmStatus = 'normal';
    }

    if (rpm > this.maxRecordedRPM) {
      this.maxRecordedRPM = rpm;
    }

    this.avgRPM = Math.round((this.avgRPM * 0.9) + (rpm * 0.1));
  }

  private normalizeSensorData(key: string, value: any): { normalizedKey: string | null; formattedValue: string } {
    switch (key.toLowerCase()) {
      case 'temperature':
      case 'temperatura':
        return { normalizedKey: 'Temperatura', formattedValue: `${value} °C` };
      case 'alcohol_concentration':
      case 'alcohol':
        return { normalizedKey: 'Alcohol', formattedValue: `${value} ppm` };
      case 'ph_value':
      case 'ph':
        return { normalizedKey: 'pH', formattedValue: String(value) };
      case 'turbidity':
      case 'turbuidez':
        return { normalizedKey: 'Turbidez', formattedValue: `${value} NTU` };
      case 'conductivity':
      case 'conductividad':
        return { normalizedKey: 'Conductividad', formattedValue: `${value} mS/cm` };
      case 'density':
      case 'densidad':
        return { normalizedKey: 'Densidad', formattedValue: String(value) };
      case 'rpm':
        return { normalizedKey: 'RPM', formattedValue: String(value) };
      default:
        return { normalizedKey: null, formattedValue: '' }; // clave no reconocida
    }
  }
}
