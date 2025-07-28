import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService1 {
  private ws!: WebSocket;
  private isConnected = false;
  private isConnecting = false;

  readonly userId = 1;
  private readonly sessionId = this.userId;

  private messages$ = new Subject<any>();

  constructor() {
    this.connect();
  }

  private connect(): void {
    if (this.isConnected || this.isConnecting) return;

    this.isConnecting = true;

    try {
      this.ws = new WebSocket(
        `wss://fermest-ws.it2id.cc/ws?user_id=${this.userId}&session_id=${this.sessionId}`
      );

      this.ws.onopen = () => {
        console.log('✅ WebSocket conectado');
        this.isConnected = true;
        this.isConnecting = false;
        this.registerUser();
      };

      this.ws.onmessage = ({ data }) => {
        try {
          this.messages$.next(JSON.parse(data));
        } catch (e) {
          console.error('❌ Error al parsear mensaje:', e);
        }
      };

      this.ws.onclose = ({ code }) => {
        console.warn(`⚠️ WebSocket cerrado (código ${code}). Reintentando en 3s...`);
        this.cleanUp();
        setTimeout(() => this.connect(), 3000);
      };

      this.ws.onerror = err => {
        console.error('❌ Error en WebSocket:', err);
        this.cleanUp();
        this.ws.close(); // Forzar cierre y reconexión
      };

    } catch (err) {
      console.error('❌ Excepción al intentar conectar WebSocket:', err);
      this.cleanUp();
      setTimeout(() => this.connect(), 3000);
    }
  }

  private cleanUp(): void {
    this.isConnected = false;
    this.isConnecting = false;
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
    }
  }

  private registerUser() {
    const payload = {
      action: 'registrarUsuario',
      data: { clientId: this.userId, sessionId: this.sessionId }
    };
    this.send(payload);
    console.log('👤 Usuario registrado:', this.userId);
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