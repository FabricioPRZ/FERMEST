import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class AddUsersComponent {
  userForm!: FormGroup;
  showPassword = false;
  showVerifyPassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        verifyPassword: ['', Validators.required],
        role: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirmPass = form.get('verifyPassword')?.value;
    return pass === confirmPass ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Usuario registrado:', this.userForm.value);
    }
  }
}
