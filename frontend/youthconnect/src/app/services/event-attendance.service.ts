import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventAttendance } from '../models/event-attendance.model';

@Injectable({
  providedIn: 'root'
})
export class EventAttendanceService {
  private apiUrl = 'http://localhost:8080/api/event-attendance';

  constructor(private http: HttpClient) {}

  registerForEvent(attendance: EventAttendance): Observable<EventAttendance> {
    return this.http.post<EventAttendance>(`${this.apiUrl}/register`, attendance);
  }

  checkRegistration(eventId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check/${eventId}/${userId}`);
  }

  getEventAttendance(eventId: number): Observable<EventAttendance[]> {
    return this.http.get<EventAttendance[]>(`${this.apiUrl}/event/${eventId}`);
  }
}
