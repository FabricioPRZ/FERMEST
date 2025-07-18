import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss'],
})
export class FormUserComponent implements OnChanges {
  @Input() userData: any = null;  
  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  userForm: FormGroup;
  showPassword = false;
  showVerifyPassword = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [null, Validators.required],
      password: [''],         
      verifyPassword: [''],    
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const verifyPass = form.get('verifyPassword')?.value;

    if (pass || verifyPass) {
      return pass === verifyPass ? null : { mismatch: true };
    }
    return null; 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && this.userData) {
      const patched = {
        ...this.userData,
        role: Number(this.userData.role),
        password: '',
        verifyPassword: '',
      };
      this.userForm.patchValue(patched);
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('verifyPassword')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('verifyPassword')?.updateValueAndValidity();
    } else {
      this.userForm.reset();
      this.userForm.get('password')?.setValidators([Validators.required]);
      this.userForm.get('verifyPassword')?.setValidators([Validators.required]);
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('verifyPassword')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = {
        ...this.userForm.value,
        role: Number(this.userForm.value.role),
      };
      if (!formValue.password) {
        delete formValue.password;
      }
      delete formValue.verifyPassword; 
      this.submitted.emit(formValue);
      this.userForm.reset();
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
