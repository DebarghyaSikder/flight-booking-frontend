import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {

  private BASE_URL = 'http://localhost:8080/booking';

  constructor(private http: HttpClient) {}

  getMyBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/my`);
  }
}
