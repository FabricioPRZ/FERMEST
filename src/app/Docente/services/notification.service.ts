import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService1 {
  private ws!: WebSocket;
  private isConnected = false;
  private isConnecting = false;

  readonly userId = 1;
  private readonly sessionId = this.userId;
  private readonly code = 200;

  private messages$ = new Subject<any>();

  constructor() {
    this.connect();
  }

  private connect(): void {
    if (this.isConnected || this.isConnecting) return;

    this.isConnecting = true;
    this.ws = new WebSocket(
      `http://18.233.248.203:8082/ws?user_id=${this.userId}&session_id=${this.sessionId}&code=${this.code}`
    );

    this.ws.onopen = () => {
      console.log('✅ WebSocket conectado');
      this.isConnected = true;
      this.isConnecting = false;
      this.registerUser();
    };

    this.ws.onmessage = ({ data }) => {
      try {
        const parsed = JSON.parse(data);
        console.log('📨 Mensaje recibido del WS:', parsed);
        this.messages$.next(parsed);
      } catch (e) {
        console.error('❌ Error al parsear mensaje:', e);
      }
    };

    this.ws.onclose = ({ code }) => {
      console.warn(`⚠️ WebSocket cerrado (código ${code}). Reintentando conexión en 3s...`);
      this.isConnected = false;
      this.isConnecting = false;
      setTimeout(() => this.connect(), 3000);
    };

    this.ws.onerror = err => {
      console.error('❌ Error en WebSocket:', err);
    };
  }

  private registerUser() {
    const payload = {
      action: 'registrarUsuario',
      data: {
        clientId: this.userId,
        sessionId: this.sessionId,
        code: this.code
      }
    };
    this.send(payload);
    console.log('👤 Usuario registrado:', this.userId, 'con código:', this.code);
  }

  listenForNotifications(): Observable<any> {
    return this.messages$.asObservable();
  }

  send(message: string | object) {
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      const msgStr = typeof message === 'string' ? message : JSON.stringify(message);
      this.ws.send(msgStr);
    } else {
      console.warn('⏳ WebSocket no listo. Mensaje descartado o en reconexión.');
    }
  }
}
