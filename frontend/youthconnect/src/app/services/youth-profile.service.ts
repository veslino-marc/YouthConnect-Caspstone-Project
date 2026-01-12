import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YouthProfile } from '../models/youth-profile.model';

@Injectable({
    providedIn: 'root'
})
export class YouthProfileService {
    private apiUrl = 'http://localhost:8080/api/youth-profile';

    constructor(private http: HttpClient) { }

    registerYouth(profile: YouthProfile): Observable<YouthProfile> {
        return this.http.post<YouthProfile>(`${this.apiUrl}/register`, profile);
    }

    getAllYouthProfiles(): Observable<YouthProfile[]> {
        return this.http.get<YouthProfile[]>(this.apiUrl);
    }

    getYouthProfileById(id: number): Observable<YouthProfile> {
        return this.http.get<YouthProfile>(`${this.apiUrl}/${id}`);
    }

    updateYouthProfile(id: number, profile: YouthProfile): Observable<YouthProfile> {
        return this.http.put<YouthProfile>(`${this.apiUrl}/${id}`, profile);
    }

    deleteYouthProfile(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
