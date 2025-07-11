import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-sensores',
  imports: [],
  templateUrl: './card-sensores.component.html',
  styleUrl: './card-sensores.component.scss'
})
export class CardSensoresComponent {
  @Input() icono : string = '';
  @Input() dato : string = '';
  @Input() nameSensor : string = '';
}
