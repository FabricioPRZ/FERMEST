import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlCardComponent } from '../../../Docente/components/control-card/control-card.component';
import { SensorStateService, DeviceId } from '../../../Docente/services/sensor-state.service';
import { CommandService } from '../../../Docente/services/command.service';
import { Subscription } from 'rxjs';
import { CardSensoresComponent } from '../../../Docente/components/card-sensores/card-sensores.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-page-admin',
  imports: [CommonModule, RouterModule, FormsModule, ControlCardComponent, CardSensoresComponent],
  templateUrl: './principal-page-admin.component.html',
  styleUrl: './principal-page-admin.component.scss'
})
export class PrincipalPageAdminComponent {

  devicesPreview = [
    { id: 'sensores', title: 'Manipulación de sensores', description: 'Controla todos los sensores en general.' },
    { id: 'bomba', title: 'Manipulación de bomba', description: 'Controla la bomba de agua.' },
    { id: 'motor', title: 'Manipulación de motor', description: 'Controla el motor principal.' },
  ];

    private sub!: Subscription;
    sensorStates: Record<DeviceId, boolean> = {} as any;

    constructor(
      private router : Router,
      private cmd: CommandService,
      private sensorState: SensorStateService
    ) {}

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
      this.router.navigate(['dashboard-administrador/sensores'])
    }
}
