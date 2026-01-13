import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-administrator-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class AdministratorLogin {
  email: string = '';
  password: string = '';
  loginError: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.loginError = 'Email and password are required';
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    const loginPayload = { 
      email: this.email, 
      password: this.password,
      role: 'administrator'
    };

    this.http.post('http://localhost:8080/api/login', loginPayload).subscribe({
      next: (response) => {
        console.log('Administrator login success:', response);
        this.isLoading = false;
        localStorage.setItem('administrator', JSON.stringify(response));
        this.router.navigate(['/administrator/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Login failed:', err);
        if (err.status === 401) {
          this.loginError = 'Invalid email or password';
        } else if (err.status === 400) {
          this.loginError = 'Invalid request. Please check your input.';
        } else {
          this.loginError = 'Login failed. Please try again.';
        }
      }
    });
  }
}
