import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const newUser = {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      role: 3
    };

    this.userService.register(newUser).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso, redirigiendo a login...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        if (err.status === 500 && err.error?.error?.includes('Duplicate entry')) {
          this.errorMessage = 'El correo electrónico ya está registrado.';
        } else {
          this.errorMessage = 'Error al registrar el usuario.';
        }
        console.error('Register error:', err);
      }
    });

  }
}
