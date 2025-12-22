import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  login() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {
      this.tokenService.save(res.token);
      this.router.navigate(['/']);
    });
  }
}
