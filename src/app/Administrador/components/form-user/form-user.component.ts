import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnInit {
  @Input() userData: any = null;
  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  userForm!: FormGroup;
  showPassword = false;
  showVerifyPassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        name: [this.userData?.name || '', Validators.required],
        lastname: [this.userData?.lastname || '', Validators.required],
        email: [this.userData?.email || '', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        verifyPassword: ['', Validators.required],
        role: [this.userData?.role || '', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('verifyPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const { verifyPassword, ...rest } = this.userForm.value;
      this.submitted.emit(rest);
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
