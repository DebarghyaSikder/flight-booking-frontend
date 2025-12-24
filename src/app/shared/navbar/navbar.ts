import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  constructor(
    public tokenService: TokenService,
    private router: Router
  ) {}

  logout() {
    this.tokenService.clear();
    this.router.navigate(['/login']);
  }

  get role() {
    return this.tokenService.getRole();
  }

  get email() {
    return this.tokenService.getEmail();
  }
}
