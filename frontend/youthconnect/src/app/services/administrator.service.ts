import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Administrator {
  administratorId?: number;
  username: string;
  email: string;
  passwordHash: string;
  isActive?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  private apiUrl = 'http://localhost:8080/api/administrator';

  constructor(private http: HttpClient) { }

  getAllAdministrators(): Observable<Administrator[]> {
    return this.http.get<Administrator[]>(this.apiUrl);
  }

  getAdministratorById(id: number): Observable<Administrator> {
    return this.http.get<Administrator>(`${this.apiUrl}/${id}`);
  }

  createAdministrator(admin: Administrator): Observable<Administrator> {
    return this.http.post<Administrator>(this.apiUrl, admin);
  }

  updateAdministrator(id: number, admin: Administrator): Observable<Administrator> {
    return this.http.put<Administrator>(`${this.apiUrl}/${id}`, admin);
  }

  deleteAdministrator(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deactivateAdministrator(id: number): Observable<Administrator> {
    return this.http.put<Administrator>(`${this.apiUrl}/${id}/deactivate`, {});
  }

  activateAdministrator(id: number): Observable<Administrator> {
    return this.http.put<Administrator>(`${this.apiUrl}/${id}/activate`, {});
  }
}
