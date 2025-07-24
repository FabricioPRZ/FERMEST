  import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { Subscription } from 'rxjs';
  import { NotificationService1 } from '../../services/notification.service'; 

  @Component({
    selector: 'app-fermentation-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './fermentation-form.component.html',
    styleUrls: ['./fermentation-form.component.scss']
  })
  export class FermentationFormComponent implements OnInit, OnDestroy {
    @Output() onSubmitForm = new EventEmitter<any>();
    fermentationForm: FormGroup;
    private wsSub!: Subscription;

    constructor(private fb: FormBuilder, private notificationService1: NotificationService1) {
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
      });
    }

    ngOnInit(): void {
      this.wsSub = this.notificationService1.listenForNotifications().subscribe({
        next: (data: any) => {
          if (typeof data.temperature === 'number') {
            this.fermentationForm.get('temperature')?.setValue(data.temperature);
          }
          if (typeof data.ph_value === 'number') {
            this.fermentationForm.get('initial_ph')?.setValue(data.ph_value);
          }
          if (typeof data.rpm === 'number') {
            this.fermentationForm.get('agitation_rpm')?.setValue(data.rpm);
          }
        }
      });
    }

    submitForm(): void {
      if (this.fermentationForm.valid) {
        this.onSubmitForm.emit(this.fermentationForm.value);
        this.fermentationForm.reset();
      }
    }

    ngOnDestroy(): void {
      this.wsSub?.unsubscribe();
    }
  }
