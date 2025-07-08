import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs';

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

  // BehaviorSubject para emitir cambios
  private stateSubject = new BehaviorSubject<Record<DeviceId, boolean>>({ ...this.states });

  set(device: DeviceId, value: boolean): void {
    this.states[device] = value;
    this.stateSubject.next({ ...this.states }); // emite el nuevo estado global
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

  observe(callback: (states: Record<DeviceId, boolean>) => void): Subscription {
    return this.stateSubject.asObservable().subscribe(callback);
  }
}
