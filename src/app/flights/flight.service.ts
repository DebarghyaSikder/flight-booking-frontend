import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly BASE_URL = 'http://localhost:8080/flight';

  constructor(private http: HttpClient) {}

  searchFlights(source: string, destination: string): Observable<any[]> {
    const params = new HttpParams()
      .set('source', source)
      .set('destination', destination);

    return this.http.get<any[]>(`${this.BASE_URL}/search`, { params });
  }
}
