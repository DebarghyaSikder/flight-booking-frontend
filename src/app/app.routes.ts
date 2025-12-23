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

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
