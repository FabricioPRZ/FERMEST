import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-control-card',
  templateUrl: './control-card.component.html',
  styleUrls: ['./control-card.component.scss']
})
export class ControlCardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() checked = false;

  toggle() {
    this.checked = !this.checked;
    // Aquí puedes emitir un evento o llamar a un servicio
  }
}
