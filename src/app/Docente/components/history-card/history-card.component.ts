import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss']
})
export class HistoryCardComponent {
  @Input() sensorName!: string;
  @Input() date!: Date | string;
  @Input() value!: string | number;
}
