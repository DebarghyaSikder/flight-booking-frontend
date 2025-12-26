import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seat-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-map.html',
  styleUrls: ['./seat-map.css']
})
export class SeatMapComponent implements OnInit {

  flightId!: number;
  seats: any[] = [];
  selectedSeats: string[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.flightId = Number(this.route.snapshot.paramMap.get('flightId'));
    this.loadSeats();
  }

  loadSeats() {
    this.http.get<any[]>(`http://localhost:8080/seat/flight/${this.flightId}`)
      .subscribe({
        next: (data) => {
          this.seats = data;
          this.loading = false;
        },
        error: () => {
          alert('Error loading seats');
          this.loading = false;
        }
      });
  }

  toggleSeat(seat: any) {
    if (seat.booked) return; // can't select booked seats

    if (this.selectedSeats.includes(seat.seatNumber)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat.seatNumber);
    } else {
      this.selectedSeats.push(seat.seatNumber);
    }
  }

  confirmSelection() {
    alert("Selected Seats: " + this.selectedSeats.join(', '));
    // NEXT STEP: integrate with /seat/book
  }
}
