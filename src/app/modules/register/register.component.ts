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

  // Función para validar si un string contiene emojis
  containsEmojis(str: string): boolean {
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}]/gu;
    return emojiRegex.test(str);
  }

  // Función para validar nombres (solo letras y algunos caracteres especiales)
  isValidName(name: string): boolean {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    return nameRegex.test(name);
  }

  // Función para validar email
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';
    this.successMessage = '';

    // Validación de campos vacíos
    if (!this.name || !this.lastName || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    // Validación de emojis
    if (this.containsEmojis(this.name) || this.containsEmojis(this.lastName) || 
        this.containsEmojis(this.email) || this.containsEmojis(this.password)) {
      this.errorMessage = 'No se permiten emojis en los campos';
      return;
    }

    // Validación de nombres
    if (!this.isValidName(this.name) || !this.isValidName(this.lastName)) {
      this.errorMessage = 'Nombre y apellido solo pueden contener letras y algunos caracteres especiales (áéíóúñü)';
      return;
    }

    // Validación de email
    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Por favor ingrese un correo electrónico válido';
      return;
    }

    // Validación de coincidencia de contraseñas
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    const newUser = {
      name: this.name.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
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