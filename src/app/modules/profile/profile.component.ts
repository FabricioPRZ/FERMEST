import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm!: FormGroup;
  user!: User;
  userId = 123; // Ejemplo, el id del usuario (puedes obtenerlo de auth, etc)
  loading = false;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
      this.initForm();
    });
  }

  initForm() {
    const isCodeEditable = this.user.code === null;

    this.profileForm = this.fb.group({
      name: [{ value: this.user.name, disabled: true }],
      lastName: [{ value: this.user.lastName, disabled: true }],
      password: [{ value: this.user.password, disabled: true }],
      email: [{ value: this.user.email, disabled: true }],
      role: [{ value: this.user.role, disabled: true }],
      code: [{ value: this.user.code ?? '', disabled: !isCodeEditable }],
    });
  }

  onSubmitCode(): void {
    if (this.profileForm.get('code')?.enabled && this.profileForm.valid) {
      const newCode = this.profileForm.get('code')?.value;
      this.loading = true;

      this.userService.updateActivationCode(this.userId, +newCode).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          // Actualiza el formulario para deshabilitar el campo
          this.initForm();
          this.loading = false;
          alert('Código actualizado correctamente.');
        },
        error: (err) => {
          console.error('Error actualizando código', err);
          this.loading = false;
          alert('Error al actualizar código.');
        },
      });
    }
  }

  goBack(): void {
    window.history.back();
  }
}
