import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {
  private ws!: WebSocket;
  private isConnected = false;

  private userId = "1";
  private sessionId = "1";

  connect(): void{
    this.ws = new WebSocket(`ws://34.196.95.251:8088/ws?user_id=${this.userId}&session_id=${this.sessionId}`);
  
  this.ws.onopen = () => {
      console.log('WebSocket conectado');
      this.isConnected = true;

  
      const msg = {
        id_user: this.userId,
        state: 'encender'
      };
      this.ws.send(JSON.stringify(msg));
      console.log('Mensaje enviado:', msg);
    };

    this.ws.onclose = () => {
      console.log('WebSocket desconectado');
      this.isConnected = false;
    };

    this.ws.onerror = (err) => {
      console.error('Error en WebSocket:', err);
    };
  }

  sendMessage(): void {
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      const msg = {
        id_user: this.userId,
        state: 'activo'
      };
      this.ws.send(JSON.stringify(msg));
      console.log('Mensaje enviado:', msg);
    } else {
      console.error('WebSocket no está conectado');
    }
  }

  ngOnDestroy(): void {
    if (this.ws) {
      this.ws.close();
    }
  }
}