import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryCardComponent } from '../../components/history-card/history-card.component';
import { NotificationService1 } from '../../services/notification.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sensors-history',
  standalone: true,
  imports: [CommonModule, HistoryCardComponent],
  templateUrl: './sensors-history.component.html',
  styleUrls: ['./sensors-history.component.scss']
})
export class SensorsHistoryComponent implements OnInit, OnDestroy {
  private historyMap: { [sensorName: string]: { date: Date, value: string } } = {};

  history: { sensorName: string, date: Date, value: string }[] = [];
  private sub!: Subscription;

  constructor(private notificationService: NotificationService1) {}

  ngOnInit() {
    this.sub = this.notificationService.listenForNotifications()
      .subscribe((data: any) => {
        console.log('🎯 Datos recibidos del backend:', data);

        const now = new Date();

        if ('alcohol_concentration' in data) {
          this.historyMap['MQ3 - Alcohol'] = { date: now, value: `${data.alcohol_concentration} %` };
        }
        if ('temperature' in data) {
          this.historyMap['DS18B20 - Temperatura'] = { date: now, value: `${data.temperature} °C` };
        }
        if ('ph_value' in data) {
          this.historyMap['SEN0161 - PH'] = { date: now, value: `${data.ph_value}` };
        }
        if ('turbidity' in data) {
          this.historyMap['SEN0189 - Turbidez'] = { date: now, value: `${data.turbidity} NTU` };
        }
        if ('conductivity' in data) {
          this.historyMap['SEN0244 - Conductividad'] = { date: now, value: `${data.conductivity} mS/cm` };
        }
        if ('density' in data) {
          this.historyMap['Densidad'] = { date: now, value: `${data.density}` };
        }
        this.history = Object.entries(this.historyMap).map(([sensorName, { date, value }]) => ({
          sensorName,
          date,
          value
        }));
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
