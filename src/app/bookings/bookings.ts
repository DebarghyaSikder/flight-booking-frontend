import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from './booking';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css']
})
export class BookingsComponent implements OnInit {

  bookings: any[] = [];
  loading = true;
  error = '';

  constructor(private bookingService: BookingService, private router: Router) {}

  ngOnInit(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);

        if (err.status === 401) {
          this.error = 'Session expired. Please log in again.';
          // Optional redirect:
          // this.router.navigate(['/login']);
        } else {
          this.error = 'Failed to load bookings';
        }

        this.loading = false;
      }
    });
  }
}
