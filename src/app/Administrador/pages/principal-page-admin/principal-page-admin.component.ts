import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ControlCardComponent } from '../../../Docente/components/control-card/control-card.component';
import { CardSensoresComponent } from '../../../Docente/components/card-sensores/card-sensores.component';
import { SensorStateService, DeviceId } from '../../../Docente/services/sensor-state.service';
import { CommandService } from '../../../Docente/services/command.service';
import { NotificationService1 } from '../../../Docente/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-principal-page-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ControlCardComponent, CardSensoresComponent],
  templateUrl: './principal-page-admin.component.html',
  styleUrl: './principal-page-admin.component.scss'
})
export class PrincipalPageAdminComponent implements OnInit, OnDestroy {

  devicesPreview = [
    { id: 'sensores', title: 'Manipulación de sensores', description: 'Controla todos los sensores en general.' },
    { id: 'bomba', title: 'Manipulación de bomba', description: 'Controla la bomba de agua.' },
    { id: 'motor', title: 'Manipulación de motor', description: 'Controla el motor principal.' },
  ];

  private sub!: Subscription;
  private wsSub!: Subscription;

  sensorStates: Record<DeviceId, boolean> = {} as any;

  sensorValues: { [sensorName: string]: string } = {
    'Temperatura': '27 °C',
    'Alcohol': '0.45 %',
    'pH': '6.8',
    'Turbidez': '12 NTU',
    'Conductividad': '1200 μS/cm',
  };

  private historyMap: { [sensorName: string]: { date: Date, value: string } } = {
    'Temperatura': { date: new Date(), value: '27 °C' },
    'Alcohol': { date: new Date(), value: '0.45 %' },
    'pH': { date: new Date(), value: '6.8' },
    'Turbidez': { date: new Date(), value: '12 NTU' },
    'Conductividad': { date: new Date(), value: '1200 μS/cm' },
  };

  recentHistory: { sensorName: string, date: string, value: string }[] = [];

  constructor(
    private router: Router,
    private cmd: CommandService,
    private sensorState: SensorStateService,
    private notificationService1: NotificationService1,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    // Estado de sensores
    this.sub = this.sensorState.observe(states => {
      this.sensorStates = states;
    });

    // Inicializar historial
    this.recentHistory = Object.entries(this.historyMap).map(([sensorName, { date, value }]) => ({
      sensorName,
      date: date.toISOString().split('T')[0],
      value
    }));

    // Suscripción al WebSocket
    this.wsSub = this.notificationService1.listenForNotifications().subscribe({
      next: (data: any) => {
        this.zone.run(() => {
          const now = new Date();
          console.log('📩 Datos WebSocket:', data);

          if ('temperature' in data) {
            const value = `${data.temperature} °C`;
            this.historyMap['Temperatura'] = { date: now, value };
            this.sensorValues['Temperatura'] = value;
          }
          if ('alcohol_concentration' in data) {
            const value = `${data.alcohol_concentration} %`;
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
            const value = `${data.conductivity} μS/cm`;
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
      error: (err) => console.error('❌ WebSocket error:', err),
      complete: () => console.log('✅ WebSocket cerrado')
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    if (this.wsSub) this.wsSub.unsubscribe();
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
    this.router.navigate(['dashboard-administrador/sensores']);
  }
}
