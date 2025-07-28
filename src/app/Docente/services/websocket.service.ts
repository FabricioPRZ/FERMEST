import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService implements OnDestroy {
  private ws!: WebSocket;
  private isConnected = false;

  public userId = "1";  // <- ahora es público
  private sessionId = "1";

  connect(): void {
    this.ws = new WebSocket(`https://34.196.95.251:8080/ws?user_id=${this.userId}&session_id=${this.sessionId}`);

    this.ws.onopen = () => {
      console.log('✅ WebSocket conectado');
      this.isConnected = true;

      const msg = { id_user: this.userId, state: 'encender' };
      this.send(msg);
    };

    this.ws.onclose = () => {
      console.log('❌ WebSocket desconectado');
      this.isConnected = false;
    };

    this.ws.onerror = (err) => {
      console.error('❌ Error en WebSocket:', err);
    };
  }

  send(message: string | object): void {
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      const msg = typeof message === 'string' ? message : JSON.stringify(message);
      this.ws.send(msg);
    } else {
      console.warn('⏳ WebSocket no listo. Mensaje no enviado:', message);
    }
  }

  ngOnDestroy(): void {
    if (this.ws) {
      this.ws.close();
    }
  }
}
