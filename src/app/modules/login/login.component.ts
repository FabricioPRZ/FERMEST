import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login(event: Event) {
    event.preventDefault();
    this.userService.login(this.email, this.password).subscribe({
      next: (response) => {
        switch(response.role) {
          case 1:
            this.router.navigate(['/dashboard-docente']);
            break;
          case 2: 
            this.router.navigate(['/dashboard-administrador']);
            break;
          case 3: 
            this.router.navigate(['/dashboard-estudiante']);
            break;
          default:
            this.errorMessage = 'Rol de usuario desconocido';
        }
      },
      error: (error) => {
        this.errorMessage = 'Credenciales inválidas';
        console.error('Login error:', error);
      }
    });
  }

  goToRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }
}
