export interface Fermentation {
  id?: number;
  operator_id: number;
  started_at: string;            // fecha ISO string
  duration_hours: number;        // duración en horas
  raw_material: string;          // nombre/material crudo (para mostrar como "nombre")
  sugar_concentration: number;
  initial_volume: number;
  microorganism_category: string;
  microorganism_name: string;
  microorganism_quantity: number;
  agitation_rpm: number;
  temperature: number;
  initial_ph: number;
  final_ph?: number;
  ethanol_concentration?: number;
  fermentation_efficiency?: number;
  fermentation_rate?: number;
  status?: string | undefined;          
}
