import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Admin {
  adminId?: number;
  roleId?: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  isActive?: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${id}`);
  }

  createAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl, admin);
  }

  updateAdmin(id: number, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiUrl}/${id}`, admin);
  }

  deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deactivateAdmin(id: number): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiUrl}/${id}/deactivate`, {});
  }
}
