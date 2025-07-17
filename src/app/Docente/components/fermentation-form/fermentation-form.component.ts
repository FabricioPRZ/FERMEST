import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-fermentation-form',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './fermentation-form.component.html',
  styleUrl: './fermentation-form.component.scss'
})
export class FermentationFormComponent {
  @Output() onSubmitForm = new EventEmitter<any>();

  fermentationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.fermentationForm = this.fb.group({
      started_at: ['', Validators.required],
      duration_hours: [0, Validators.required],
      raw_material: ['', Validators.required],
      sugar_concentration: [0, Validators.required],
      initial_volume: [0, Validators.required],
      microorganism_category: ['', Validators.required],
      microorganism_name: ['', Validators.required],
      microorganism_quantity: [0, Validators.required],
      agitation_rpm: [0, Validators.required],
      temperature: [0, Validators.required],
      initial_ph: [0, Validators.required],
      final_ph: [0, Validators.required],
      ethanol_concentration: [0, Validators.required],
      fermentation_efficiency: [0, Validators.required],
      fermentation_rate: [0, Validators.required],
    });
  }

  submitForm() {
    if (this.fermentationForm.valid) {
      this.onSubmitForm.emit(this.fermentationForm.value);
      this.fermentationForm.reset();
    }
  }
}
