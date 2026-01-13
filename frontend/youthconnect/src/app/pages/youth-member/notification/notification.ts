import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouthSidebar } from '../../../shared/components/youth-sidebar/youth-sidebar';
import { ConcernService } from '../../../services/concern.service';
import { ConcernUpdate } from '../../../models/concern.model';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [YouthSidebar, CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification implements OnInit {
  concernUpdates: ConcernUpdate[] = [];
  loading = true;
  errorMessage = '';
  youthId: number | null = null;

  constructor(private concernService: ConcernService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Get youth ID from localStorage
    const userData = localStorage.getItem('user');
    console.log('User data from localStorage:', userData);
    if (userData) {
      try {
        const user = JSON.parse(userData);
        console.log('Parsed user:', user);
        this.youthId = user.youthId || user.userId;
        console.log('Youth ID:', this.youthId);
        if (this.youthId) {
          this.loadConcernUpdates();
        } else {
          this.errorMessage = 'Youth ID not found in user data';
          this.loading = false;
        }
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
        this.errorMessage = 'Failed to load user information';
        this.loading = false;
      }
    } else {
      this.errorMessage = 'User information not found. Please log in again.';
      this.loading = false;
    }
  }

  loadConcernUpdates() {
    if (!this.youthId) return;

    console.log('Loading concern updates for youth ID:', this.youthId);
    this.concernService.getConcernUpdatesByYouthId(this.youthId).subscribe({
      next: (updates) => {
        console.log('Received updates from API:', updates);
        this.concernUpdates = updates.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA; // Newest first
        });
        console.log('Sorted updates:', this.concernUpdates);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading concern updates:', err);
        console.error('Error details:', err.error, err.status, err.statusText);
        this.errorMessage = 'Failed to load notifications: ' + (err.error?.message || err.statusText);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
