import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Fermentation } from '../../../interfaces/fermentation';

(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  generatePDF(data: Fermentation): void {
    const styles = {
      header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] as [number, number, number, number] },
      subheader: { fontSize: 14, margin: [0, 10, 0, 5] as [number, number, number, number] }
    };

    const docDefinition = {
      content: [
        { text: 'Reporte de Fermentación', style: 'header' },
        { text: `Materia prima: ${data.raw_material}`, style: 'subheader' },
        {
          table: {
            widths: ['*', '*'],
            body: [
              ['Fecha de Inicio', new Date(data.started_at).toLocaleString()],
              ['Duración (h)', data.duration_hours],
              ['pH Inicial', data.initial_ph],
              ['pH Final', data.final_ph ?? 'N/D'],
              ['Temperatura (°C)', data.temperature],
              ['RPM', data.agitation_rpm],
              ['Azúcar (g/L)', data.sugar_concentration],
              ['Etanol (g/L)', data.ethanol_concentration ?? 'N/D'],
              ['Eficiencia (%)', data.fermentation_efficiency?.toFixed(2) ?? 'N/D'],
              ['Tasa Fermentación (g/L·h)', data.fermentation_rate?.toFixed(2) ?? 'N/D']
            ]
          }
        }
      ],
      styles
    };

    pdfMake.createPdf(docDefinition).download(`reporte-fermentacion-${data.id}.pdf`);
  }
}
