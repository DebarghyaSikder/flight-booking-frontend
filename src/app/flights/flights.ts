import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlightService } from './flight.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../core/services/token.service';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flights.html',
  styleUrls: ['./flights.css']
})
export class FlightsComponent {

  source = '';
  destination = '';
  flights: any[] = [];
  loading = false;
  error = '';

  seatsMap: Record<number, number> = {}; // flightId → seats

  constructor(
  private flightService: FlightService,
  private http: HttpClient,
  private tokenService: TokenService
) {}

get isUser(): boolean {
  return this.tokenService.getRole() === 'USER';
}

  search() {
    this.loading = true;
    this.error = '';

    this.flightService.searchFlights(this.source, this.destination).subscribe({
      next: (data) => {
        this.flights = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load flights';
        this.loading = false;
      }
    });
  }

  bookFlight(flight: any) {
    const seats = this.seatsMap[flight.id];

    if (!seats || seats <= 0) {
      alert('Please enter valid seat count');
      return;
    }

    const payload = {
      flightId: flight.id,
      seatsBooked: seats,
      totalAmount: seats * flight.price
    };

    this.http.post('http://localhost:8080/booking/create', payload)
      .subscribe({
        next: () => {
  alert('Booking successful!');

  // Updates UI immediately
  flight.availableSeats -= seats;

  // Reset seat input
  this.seatsMap[flight.id] = 0;
},
        error: () => {
          alert('Booking failed');
        }
      });
  }
}
