import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Concern, ConcernDTO } from '../models/concern.model';

@Injectable({
    providedIn: 'root'
})
export class ConcernService {
    private apiUrl = 'http://localhost:8080/api/concerns';

    constructor(private http: HttpClient) { }

    createConcern(concernDTO: ConcernDTO): Observable<Concern> {
        return this.http.post<Concern>(this.apiUrl, concernDTO);
    }

    getAllConcerns(): Observable<Concern[]> {
        return this.http.get<Concern[]>(this.apiUrl);
    }

    getConcernById(id: number): Observable<Concern> {
        return this.http.get<Concern>(`${this.apiUrl}/${id}`);
    }

    getConcernsByYouthId(youthId: number): Observable<Concern[]> {
        return this.http.get<Concern[]>(`${this.apiUrl}/youth/${youthId}`);
    }

    getConcernsByStatus(status: string): Observable<Concern[]> {
        return this.http.get<Concern[]>(`${this.apiUrl}/status/${status}`);
    }

    updateConcernStatus(id: number, status: string): Observable<Concern> {
        return this.http.put<Concern>(`${this.apiUrl}/${id}/status`, status);
    }

    deleteConcern(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
