import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PushNotificationComponent } from './components/push-notification/push-notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PushNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Fermentador';
}