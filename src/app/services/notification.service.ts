import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ToastType = 'info' | 'success' | 'error';

interface AppNotification {
  id: number;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type: ToastType;
  route?: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  // Para notificaciones toast (temporales)
  private messageSubject = new BehaviorSubject<string>('');
  private visibleSubject = new BehaviorSubject<boolean>(false);
  private typeSubject = new BehaviorSubject<ToastType>('info');

  // Para notificaciones persistentes
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  
  // Observables públicos
  message$ = this.messageSubject.asObservable();
  visible$ = this.visibleSubject.asObservable();
  type$ = this.typeSubject.asObservable();
  notifications$ = this.notificationsSubject.asObservable();
  unreadCount$ = new BehaviorSubject<number>(0);

  constructor() {
    // Notificaciones de ejemplo
    const initialNotifications: AppNotification[] = [
      {
        id: 1,
        title: 'Bienvenido',
        message: 'El sistema de fermentación está listo para usar',
        date: new Date(),
        read: false,
        type: 'info'
      },
      {
        id: 2,
        title: 'Alerta',
        message: 'Verifique la temperatura del fermentador',
        date: new Date(Date.now() - 3600000),
        read: false,
        type: 'error',
        route: '/dashboard/sensors'
      }
    ];
    this.notificationsSubject.next(initialNotifications);
    this.updateUnreadCount();
  }

  // Métodos para notificaciones toast
  showToast(message: string, type: ToastType = 'info') {
    this.messageSubject.next(message);
    this.typeSubject.next(type);
    this.visibleSubject.next(true);

    setTimeout(() => this.hideToast(), 5000);
  }

  hideToast() {
    this.visibleSubject.next(false);
  }

  // Métodos para notificaciones persistentes
  addNotification(notification: Omit<AppNotification, 'id' | 'date' | 'read'>) {
    const current = this.notificationsSubject.value;
    const newNotification: AppNotification = {
      ...notification,
      id: this.generateId(),
      date: new Date(),
      read: false
    };
    this.notificationsSubject.next([newNotification, ...current]);
    this.updateUnreadCount();
    this.showToast(notification.message, notification.type);
  }

  markAsRead(id: number) {
    const notifications = this.notificationsSubject.value.map(n => 
      n.id === id ? {...n, read: true} : n
    );
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount();
  }

  markAllAsRead() {
    const notifications = this.notificationsSubject.value.map(n => 
      ({...n, read: true})
    );
    this.notificationsSubject.next(notifications);
    this.updateUnreadCount();
  }

  private generateId(): number {
    const current = this.notificationsSubject.value;
    return current.length > 0 ? Math.max(...current.map(n => n.id)) + 1 : 1;
  }

  private updateUnreadCount() {
    const count = this.notificationsSubject.value.filter(n => !n.read).length;
    this.unreadCount$.next(count);
  }
}