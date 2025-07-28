import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Notification } from '../../interfaces/notification';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService1 {

  private baseUrl = 'https://fermest-apin.it2id.cc/api/notifications';

  private _notifications$ = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this._notifications$.asObservable();

  constructor(private http: HttpClient) {
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    this.getAllNotifications().subscribe(notifications => {
      this._notifications$.next(notifications);
    });
  }

  createNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(this.baseUrl, notification).pipe(
      tap(() => this.fetchNotifications())
    );
  }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.baseUrl);
  }

  getNotificationById(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.baseUrl}/${id}`);
  }

  updateNotification(id: number, notification: Notification): Observable<Notification> {
    return this.http.put<Notification>(`${this.baseUrl}/${id}`, notification).pipe(
      tap(() => this.fetchNotifications())
    );
  }

  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.fetchNotifications())
    );
  }

  markAsRead(id: number): void {
    const current = this._notifications$.value.map(n => {
      if (n.id === id) {
        return { ...n, read: true };
      }
      return n;
    });
    this._notifications$.next(current);
  }

  markAllAsRead(): void {
    const updated = this._notifications$.value.map(n => ({
      ...n,
      read: true
    }));
    this._notifications$.next(updated);
  }
}
