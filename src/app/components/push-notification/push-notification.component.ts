import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-push-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './push-notification.component.html',
  styleUrls: ['./push-notification.component.scss']
})
export class PushNotificationComponent {
  isVisible = false;
  private timeoutId: any;

  constructor(public notificationService: NotificationService) {
    this.notificationService.visible$.subscribe(visible => {
      if (visible) {
        this.isVisible = true;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.isVisible = false;
        }, 4800);
      } else {
        this.isVisible = false;
      }
    });
  }
}