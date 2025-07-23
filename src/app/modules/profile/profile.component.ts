import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: User;
  loading = false;
  showSuccessMessage = false;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
  }

  get showActivationSection(): boolean {
    return this.user && !this.user.code;
  }

  get showFormActions(): boolean {
    return this.showActivationSection;
  }

  loadUser(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.initForm();
      },
      error: (err) => {
        console.error('Error al cargar usuario', err);
      }
    });
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      code: [
        { 
          value: this.user?.code != null ? String(this.user.code) : '', 
          disabled: !!this.user?.code 
        },
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ]
    });
  }

  onSubmitCode(): void {
    if (this.profileForm.valid && this.showActivationSection && this.user.id !== undefined) {
      this.loading = true;
      const newCode = this.profileForm.get('code')?.value;

      this.userService.updateActivationCode(this.user.id, newCode).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.loading = false;
          this.showSuccessMessage = true;
          this.initForm();
        },
        error: (err) => {
          console.error('Error actualizando código', err);
          this.loading = false;
        }
      });
    }
  }

  goBack(): void {
    window.history.back();
  }

  getRoleName(role: number | null | undefined): string {
    switch (role) {
      case 1: return 'Estudiante';
      case 2: return 'Docente';
      case 3: return 'Administrador';
      default: return 'Sin rol';
    }
  }
}