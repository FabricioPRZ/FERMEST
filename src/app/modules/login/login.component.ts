import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-login',
  imports: [HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(public router: Router) {}
  
  goToRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }
}
