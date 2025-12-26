import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  email = '';
  role = '';

  constructor(public tokenService: TokenService) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('user_email') ?? '';
    this.role = localStorage.getItem('user_role') ?? '';
  }

  logout() {
    this.tokenService.clear();
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
    window.location.href = '/login';
  }
}
