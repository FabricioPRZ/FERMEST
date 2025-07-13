import { Component } from '@angular/core';
import { CardSensoresComponent } from "../../../Docente/components/card-sensores/card-sensores.component";

@Component({
  selector: 'app-principal-page-student',
  imports: [CardSensoresComponent],
  templateUrl: './principal-page-student.component.html',
  styleUrl: './principal-page-student.component.scss'
})
export class PrincipalPageStudentComponent{
  recentHistory = [
    { sensorName: 'Temperatura', date: '2025-07-01', value: '27 °C' },
    { sensorName: 'Alcohol', date: '2025-07-01', value: '0.45 %' },
    { sensorName: 'pH', date: '2025-06-30', value: '6.8' },
    { sensorName: 'Turbidez', date: '2025-06-30', value: '12 NTU' },
    { sensorName: 'Conductividad', date: '2025-06-29', value: '1200 μS/cm' },
  ];
}
