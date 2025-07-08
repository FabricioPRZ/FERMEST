import { Injectable } from '@angular/core';

export type DeviceId =
  | 'alcohol' | 'temperatura' | 'ph' | 'turbidez'
  | 'conductividad' | 'bomba' | 'motor' | 'sensores';

@Injectable({ providedIn: 'root' })
export class SensorStateService {
  private states: Record<DeviceId, boolean> = {
    alcohol: false,
    temperatura: false,
    ph: false,
    turbidez: false,
    conductividad: false,
    bomba: false,
    motor: false,
    sensores: false,
  };

  set(device: DeviceId, value: boolean) {
    this.states[device] = value;
  }

  get(device: DeviceId): boolean {
    return this.states[device];
  }

  getAll(): Record<DeviceId, boolean> {
    return { ...this.states };
  }

  areAllSensorsOn(): boolean {
    return ['alcohol', 'temperatura', 'ph', 'turbidez', 'conductividad']
      .every(d => this.states[d as DeviceId]);
  }
}
