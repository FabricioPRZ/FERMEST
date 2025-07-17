import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user'; // ajusta según tu backend

  constructor(private http: HttpClient) { }

  // Simular obtener usuario (en tu caso sería un GET real)
  getUser(): Observable<User> {
    // Aquí un GET real sería: return this.http.get<User>(`${this.apiUrl}/profile`);
    // Simulación:
    return of({
      name: 'Víctor',
      lastName: 'Pérez',
      password: '********',
      email: 'victor@example.com',
      role: 1,
      code: null,
    });
  }

  // Actualizar solo el código (PATCH por ejemplo)
  updateActivationCode(userId: number, code: number): Observable<User> {
    // Aquí el PUT o PATCH real:
    // return this.http.patch<User>(`${this.apiUrl}/${userId}/activation-code`, { code });
    // Simulación de respuesta:
    return of({
      name: 'Víctor',
      lastName: 'Pérez',
      password: '********',
      email: 'victor@example.com',
      role: 1,
      code: code,
    });
  }
}
