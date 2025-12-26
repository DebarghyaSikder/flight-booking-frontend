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
  travelDate = '';
  flights: any[] = [];
  recentSearches: { source: string, destination: string, date: string }[] = [];
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

  /** ------------------------------
   * RECENT SEARCHES HANDLING
   * ------------------------------ */
  saveSearch() {
  if (!this.source || !this.destination || !this.travelDate) return;

  const entry = {
    source: this.source,
    destination: this.destination,
    date: this.travelDate
  };

  this.recentSearches = [
    entry,
    ...this.recentSearches.filter(
      s => !(s.source === entry.source && s.destination === entry.destination && s.date === entry.date)
    )
  ].slice(0, 5); // max 5
}

useSearch(entry: { source: string, destination: string, date: string }) {
  this.source = entry.source;
  this.destination = entry.destination;
  this.travelDate = entry.date;
  this.search();
}

search() {
  if (!this.source || !this.destination || !this.travelDate) {
    alert("Please select source, destination & date");
    return;
  }

  this.loading = true;
  this.error = '';
  this.saveSearch();

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

  /** ------------------------------
   * BOOKING
   * ------------------------------ */
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

    this.http.post('http://localhost:8080/booking/create', payload).subscribe({
      next: () => {
        alert('Booking successful!');
        flight.availableSeats -= seats;
        this.seatsMap[flight.id] = 0;
      },
      error: () => {
        alert('Booking failed');
      }
    });
  }
}
