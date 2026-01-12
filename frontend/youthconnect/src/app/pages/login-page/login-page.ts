import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage {
  activeTab: 'sk' | 'youth' = 'youth';

  setTab(tab: 'sk' | 'youth') {
    this.activeTab = tab;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const email = data.get('email') as string | null;
    const password = data.get('password') as string | null;
    console.log('Login submitted:', { 
      email, 
      password, 
      role: this.activeTab 
    });
    // TODO: Call authentication API and handle response
  }
}