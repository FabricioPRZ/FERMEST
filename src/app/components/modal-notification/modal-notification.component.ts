import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-notification',
  imports: [CommonModule],
  templateUrl: './modal-notification.component.html',
  styleUrl: './modal-notification.component.scss'
})
export class ModalNotificationComponent {
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    public notificationService: NotificationService,
    private router: Router
  ) { }

  onNotificationClick(notification: any) {
    this.notificationService.markAsRead(notification.id);
    if (notification.route) {
      this.router.navigate([notification.route]);
      this.closeModal.emit();
    }
  }

  viewAllNotifications() {
    this.router.navigate(['/notifications']);
    this.closeModal.emit();
  }
}
