import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlCardComponent } from '../../../Docente/components/control-card/control-card.component';
import { CommandService } from '../../../Docente/services/command.service';
import { SensorStateService, DeviceId } from '../../../Docente/services/sensor-state.service';

@Component({
  selector: 'app-sensores-admin',
  imports: [ControlCardComponent, CommonModule],
  templateUrl: './sensores-admin.component.html',
  styleUrl: './sensores-admin.component.scss'
})
export class SensoresAdminComponent {
  constructor(
    private cmd: CommandService,
    private sensorState: SensorStateService
  ) {}

  onToggle(event: { device: string; on: boolean }): void {
    const device = event.device as DeviceId;

    if (device === 'sensores') {
      this.sensorState.set('sensores', event.on);
      const sensores = ['alcohol', 'temperatura', 'ph', 'turbidez', 'conductividad'] as const;
      sensores.forEach(d => this.sensorState.set(d, event.on));

      this.cmd.switch('sensores', event.on);
      return;
    }

    this.sensorState.set(device, event.on);
    this.cmd.switch(device, event.on);

    // Si apagamos uno estando "sensores" encendido
    if (this.sensorState.get('sensores') && !event.on) {
      this.sensorState.set('sensores', false);
    }
  }

  isChecked(device: string): boolean {
    return this.sensorState.get(device as DeviceId);
  }
}
