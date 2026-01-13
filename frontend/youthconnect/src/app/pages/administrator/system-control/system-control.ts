import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-control.html',
  styleUrls: ['./system-control.scss']
})
export class SystemControlPage {
  systemStatus: any = {
    database: 'Connected',
    api: 'Running',
    frontend: 'Running',
    lastBackup: new Date(Date.now() - 86400000).toLocaleString()
  };

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`/administrator/${route}`]);
  }

  goBack() {
    this.router.navigate(['/administrator/dashboard']);
  }
}
