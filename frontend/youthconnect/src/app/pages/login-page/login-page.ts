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

  constructor(private http: HttpClient, private router: Router) {}

  setTab(tab: 'sk' | 'youth') {
    this.activeTab = tab;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const email = data.get('email') as string | null;
    const password = data.get('password') as string | null;

    this.http.post('http://localhost:8080/api/login', { email, password })
      .subscribe({
        next: (response) => {
          if (this.activeTab === 'youth') {
            this.router.navigate(['/youth-member/dashboard']);
          } else if (this.activeTab === 'sk') {
            this.router.navigate(['/sk-official/dashboard']);
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
  }
}