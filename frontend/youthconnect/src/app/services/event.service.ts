import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) { }

  createEvent(eventData: Event): Observable<Event> {
    // Convert the date format from 'YYYY-MM-DDTHH:mm' to ISO format for backend
    const formattedData = {
      title: eventData.title,
      description: eventData.description,
      eventDate: eventData.eventDate ? new Date(eventData.eventDate).toISOString() : null,
      location: eventData.location,
      createdByAdminId: eventData.createdByAdminId
    };
    
    return this.http.post<Event>(this.apiUrl, formattedData);
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  getEventsByAdminId(adminId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/admin/${adminId}`);
  }

  updateEvent(id: number, eventData: Event): Observable<Event> {
    const formattedData = {
      title: eventData.title,
      description: eventData.description,
      eventDate: eventData.eventDate ? new Date(eventData.eventDate).toISOString() : null,
      location: eventData.location,
      createdByAdminId: eventData.createdByAdminId
    };
    
    return this.http.put<Event>(`${this.apiUrl}/${id}`, formattedData);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
