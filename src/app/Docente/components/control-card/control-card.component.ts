import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-control-card',
  templateUrl: './control-card.component.html',
  styleUrls: ['./control-card.component.scss']
})
export class ControlCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() checked = false;
  @Input() device!: string; // id único del actuador / sensor

  @Output() toggled = new EventEmitter<{ device: string; on: boolean }>();

  toggle(): void {
    this.checked = !this.checked;
    this.toggled.emit({ device: this.device, on: this.checked });
  }
}
