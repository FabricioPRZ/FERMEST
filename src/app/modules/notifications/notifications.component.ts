import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  constructor(
    public notificationService: NotificationService,
    private router: Router
  ) {}

  onNotificationClick(notification: any) {
    this.notificationService.markAsRead(notification.id);
    if (notification.route) {
      this.router.navigate([notification.route]);
    }
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead();
  }

  goBack(): void {
    window.history.back();
  }
}