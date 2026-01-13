import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/create`, task);
  }

  updateTask(taskId: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${taskId}`);
  }

  getTaskById(taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}`);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTasksByAdminId(adminId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/admin/${adminId}`);
  }

  getTasksByStatus(status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/status/${status}`);
  }

  getTasksByAdminIdAndStatus(adminId: number, status: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/admin/${adminId}/status/${status}`);
  }
}
