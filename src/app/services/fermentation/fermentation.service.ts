import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Fermentation } from '../../interfaces/fermentation';


@Injectable({
  providedIn: 'root'
})
export class FermentationService {
  private baseUrl = 'https://fermest-api.it2id.cc/api/fermentation';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAll(userId: number): Observable<Fermentation[]> {
    return this.http.get<Fermentation[]>(`${this.baseUrl}/all/${userId}`, {
      headers: this.getHeaders()
    });
  }

 create(fermentation: Fermentation): Observable<Fermentation> {
  return this.http.post<{ data: Fermentation; message: string }>(`${this.baseUrl}/create`, fermentation, {
    headers: this.getHeaders()
  }).pipe(
    map(response => response.data)
  );
}

  delete(id: number, userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}/${userId}`, {
      headers: this.getHeaders()
    });
  }

  update(id: number, userId: number, fermentation: Fermentation): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}/${userId}`, fermentation, {
      headers: this.getHeaders()
    });
  }

  getById(id: number, userId: number): Observable<Fermentation> {
    return this.http.get<Fermentation>(`${this.baseUrl}/record/${id}/${userId}`, {
      headers: this.getHeaders()
    });
  }
}
