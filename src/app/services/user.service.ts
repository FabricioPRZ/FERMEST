import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://3.226.201.85:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ role: number; token: string; userId: number }> {
    return this.http.post<{ role: number; token: string; userId: number }>(
      `${this.apiUrl}/login`, 
      { email, password }
    ).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role.toString());
        localStorage.setItem('userId', response.userId.toString());
      })
    );
  }
getAllUsers(): Observable<User[]> {
  return this.http.get<{ users: User[] }>(`${this.apiUrl}/clients`, {
    headers: this.getHeaders()
  }).pipe(
    map(response => response.users || [])
  );
}



  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/clients`, user, {
      headers: this.getHeaders()
    });
  }

  getUserById(userId: number): Observable<User> {
  return this.http.get<User>(`${this.apiUrl}/clients/${userId}`, {
    headers: this.getHeaders()
  });
}


  getUser(): Observable<User> {
    const userId = localStorage.getItem('userId');
    return this.http.get<User>(`${this.apiUrl}/clients/${userId}`, {
      headers: this.getHeaders()
    });
  }

  updateUser(userId: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/clients/${userId}`, user, {
      headers: this.getHeaders()
    });
  }

  updateActivationCode(userId: number, code: number): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/clients/${userId}`, { code }, {
      headers: this.getHeaders()
    });
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${userId}`, {
      headers: this.getHeaders()
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): number | null {
    const role = localStorage.getItem('role');
    return role ? +role : null;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token || ''}`
    });
  }
}
