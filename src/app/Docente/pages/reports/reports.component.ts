import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reports: { name: string; date: Date; fileUrl: string }[] = [];

  generateReport(): void {
    const now = new Date();
    const report = {
      name: `Reporte ${this.reports.length + 1}`,
      date: now,
      fileUrl: 'assets/files/ejemplo-reporte.pdf', // reemplaza por la URL generada
    };
    this.reports.unshift(report);
  }

  downloadReport(report: any): void {
    const link = document.createElement('a');
    link.href = report.fileUrl;
    link.download = report.name + '.pdf';
    link.click();
  }
}
