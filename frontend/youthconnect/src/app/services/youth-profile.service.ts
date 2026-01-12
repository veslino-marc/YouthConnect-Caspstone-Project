import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YouthProfile, YouthProfileWithClassification, YouthProfileDTO } from '../models/youth-profile.model';

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
    
    getAllYouthProfilesWithClassification(): Observable<YouthProfileWithClassification[]> {
        return this.http.get<YouthProfileWithClassification[]>(`${this.apiUrl}/with-classification`);
    }

    getYouthProfileById(id: number): Observable<YouthProfile> {
        return this.http.get<YouthProfile>(`${this.apiUrl}/${id}`);
    }
    
    getYouthProfileWithClassificationById(id: number): Observable<YouthProfileWithClassification> {
        return this.http.get<YouthProfileWithClassification>(`${this.apiUrl}/${id}/with-classification`);
    }

    updateYouthProfile(id: number, profile: YouthProfile): Observable<YouthProfile> {
        return this.http.put<YouthProfile>(`${this.apiUrl}/${id}`, profile);
    }
    
    updateYouthProfileWithClassification(id: number, profile: YouthProfileDTO): Observable<YouthProfile> {
        return this.http.put<YouthProfile>(`${this.apiUrl}/${id}/with-classification`, profile);
    }

    deleteYouthProfile(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
