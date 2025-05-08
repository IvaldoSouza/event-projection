import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventProjection } from '../models/event-projections.model';
import { Cycle } from '../models/cycle.model';

@Injectable({
    providedIn: 'root'
})
export class MockApiService {

    constructor(private http: HttpClient) { }

    getMockData(): Observable<{ eventsProjection: EventProjection[]; cycles: Cycle[] }> {
        console.log('chegou aqui');
        return this.http.get<{ eventsProjection: EventProjection[]; cycles: Cycle[] }>('assets/mock-data.json');
    }
}
