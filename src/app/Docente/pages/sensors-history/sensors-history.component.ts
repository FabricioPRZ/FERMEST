import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryCardComponent } from '../../components/history-card/history-card.component';

@Component({
  selector: 'app-sensors-history',
  standalone: true,
  imports: [CommonModule, HistoryCardComponent],
  templateUrl: './sensors-history.component.html',
  styleUrls: ['./sensors-history.component.scss']
})
export class SensorsHistoryComponent {
  history = [
    { sensorName: 'MQ3 - Alcohol', date: new Date(), value: '0.85 %' },
    { sensorName: 'DS18B20 - Temperatura', date: new Date(), value: '28.4 °C' },
    { sensorName: 'SEN0161 - PH', date: new Date(), value: '6.7' },
    { sensorName: 'SEN0189 - Turbidez', date: new Date(), value: '120 NTU' },
    { sensorName: 'SEN0244 - Conductividad', date: new Date(), value: '1.2 mS/cm' }
  ];
}
