import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage {
  activeTab: 'sk' | 'youth' = 'youth';
  loginError: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  setTab(tab: 'sk' | 'youth') {
    this.activeTab = tab;
    this.loginError = '';
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const email = data.get('email') as string | null;
    const password = data.get('password') as string | null;

    if (!email || !password) {
      this.loginError = 'Email and password are required';
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    const loginPayload = { 
      email, 
      password,
      role: this.activeTab
    };
    console.log('Submitting login payload:', JSON.stringify(loginPayload));
    console.log('Active tab:', this.activeTab);

    this.http.post('http://localhost:8080/api/login', loginPayload).subscribe({
        next: (response) => {
          console.log('Login success:', response);
          this.isLoading = false;
          
          // Store user/admin data in localStorage
          if (this.activeTab === 'youth') {
            localStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['/youth-member/dashboard']);
          } else if (this.activeTab === 'sk') {
            localStorage.setItem('admin', JSON.stringify(response));
            this.router.navigate(['/sk-official/dashboard']);
          }
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

  onBack() {
    this.router.navigate(['']);
  }
}