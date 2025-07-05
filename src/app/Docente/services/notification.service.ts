import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private ws!: WebSocket;
  private isConnected = false;

  connect(): void {
    const userId = "1";
    const sessionId = userId;

     this.ws = new WebSocket(`ws://34.196.95.251:8082/ws?user_id=${userId}&session_id=${sessionId}`);

    this.ws.onopen = () => {
      console.log('WebSocket conectado');
      this.isConnected = true;
      this.registerUser(userId);
    };

    this.ws.onclose = () => {
      console.log('WebSocket desconectado');
      this.isConnected = false;
    };

    this.ws.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };
  }

  registerUser(userId: string) {
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        action: 'registrarUsuario',
        data: { clientId: userId, sessionId: userId }
      });
      this.ws.send(message);
      console.log('Usuario registrado:', userId);
    } else {
      console.error('No conectado, no se puede registrar usuario');
    }
  }

  listenForNotifications(): Observable<any> {
  return new Observable<any>(observer => {
    if (!this.ws) {
      observer.error('WebSocket no conectado');
      return;
    }

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        observer.next(data);
      } catch (err) {
        console.error('Error al parsear mensaje:', err);
      }
    };

    return () => {
      this.ws?.close();
      console.log('WebSocket cerrado desde Observable');
    };
  });
}


  sendMessage(message: string) {
    if (this.isConnected && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
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
