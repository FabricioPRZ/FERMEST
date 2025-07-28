import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

export type DeviceId =
  | 'alcohol' | 'temperatura' | 'ph' | 'turbidez'
  | 'conductividad' | 'bomba' | 'motor' | 'sensores';

@Injectable({ providedIn: 'root' })
export class CommandService {
  constructor(private ws: WebsocketService) { }

  switch(device: DeviceId, on: boolean): void {
    const payload = {
      id_user: this.ws.userId,  // ✅ ya accesible
      device,
      state: on ? 'encendido' : 'apagado'
    };

    this.ws.send(payload);
    console.log('▶️ Mensaje enviado al ESP32:', payload);
  }
}

