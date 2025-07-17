import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { ModalNotificationComponent } from '../modal-notification/modal-notification.component';

@Component({
  selector: 'app-loged-header',
  standalone: true,
  imports: [CommonModule, ModalNotificationComponent],
  templateUrl: './loged-header.component.html',
  styleUrls: ['./loged-header.component.scss']
})
export class LogedHeaderComponent {
  showNotifications = false;
  unreadCount = 0;

  constructor(
    public router: Router,
    public notificationService: NotificationService
  ) {
    this.notificationService.unreadCount$.subscribe(count => {
      this.unreadCount = count;
    });
  }

  goToProfile(event: Event) {
    event.preventDefault();
    this.router.navigate(['/profile']);
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  closeNotifications() {
    this.showNotifications = false;
  }
}