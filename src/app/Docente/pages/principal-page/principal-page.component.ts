import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-principal-page',
  imports: [CommonModule, RouterModule, FormsModule, ControlCardComponent, HistoryCardComponent, CardSensoresComponent],
  templateUrl: './principal-page.component.html',
  styleUrl: './principal-page.component.scss'
})
export class PrincipalPageComponent implements OnInit, OnDestroy {
  recentHistory = [
    { sensorName: 'Temperatura', date: '2025-07-01', value: '27 °C' },
    { sensorName: 'Alcohol', date: '2025-07-01', value: '0.45 %' },
    { sensorName: 'pH', date: '2025-06-30', value: '6.8' },
    { sensorName: 'Turbidez', date: '2025-06-30', value: '12 NTU' },
    { sensorName: 'Conductividad', date: '2025-06-29', value: '1200 μS/cm' },
  ];

  devicesPreview = [
    { id: 'sensores', title: 'Manipulación de sensores', description: 'Controla todos los sensores en general.' },
    { id: 'bomba', title: 'Manipulación de bomba', description: 'Controla la bomba de agua.' },
    { id: 'motor', title: 'Manipulación de motor', description: 'Controla el motor principal.' },
  ];

  private sub!: Subscription;
  sensorStates: Record<DeviceId, boolean> = {} as any;

  constructor(
    private router: Router,
    private cmd: CommandService,
    private sensorState: SensorStateService,
    private notificationService: NotificationService
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
    this.sub = this.sensorState.observe(states => {
      this.sensorStates = states;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
    this.router.navigate(['dashboard-docente/sensores'])
  }
}