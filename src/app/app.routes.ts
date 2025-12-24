import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'flights',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./flights/flights').then(m => m.FlightsComponent)
  },

  // ✅ ADD THIS ROUTE
  {
    path: 'my-bookings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./bookings/bookings').then(m => m.BookingsComponent)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
