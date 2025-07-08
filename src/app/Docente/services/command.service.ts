import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

export type DeviceId =
  | 'alcohol' | 'temperatura' | 'ph' | 'turbidez'
  | 'conductividad' | 'bomba' | 'motor' | 'sensores';

@Injectable({ providedIn: 'root' })
export class CommandService {
  constructor(private ws: NotificationService) {}

  switch(device: DeviceId, on: boolean): void {
    const payload = {
      id_user: this.ws.userId,
      device,
      state: on ? 'encendido' : 'apagado'
    };
    
    this.ws.send(payload);  // 🔴 Este mensaje va directo al WebSocket, y por tanto, al ESP32
    console.log('▶️ Mensaje enviado al ESP32:', payload);
  }
}
