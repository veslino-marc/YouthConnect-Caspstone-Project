import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YouthSidebar } from '../../../shared/components/youth-sidebar/youth-sidebar';
import { EventService } from '../../../services/event.service';
import { EventAttendanceService } from '../../../services/event-attendance.service';
import { ConcernService } from '../../../services/concern.service';
import type { Event } from '../../../models/event.model';
import type { ConcernUpdate } from '../../../models/concern.model';
import type { Notification } from '../../../models/notification.model';
import { DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [YouthSidebar, RouterLink, DatePipe, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  userName = '';
  userEmail = '';
  userInitials = '';
  fullName = '';

  // Stats
  myConcerns = 0;
  upcomingEvents = 0;
  eventsJoined = 0;
  resolvedConcerns = 0;

  // User ID for fetching user-specific data
  currentUserId: number | null = null;
  currentYouthId: number | null = null;

  // Real events data from backend
  events: Event[] = [];

  // Notifications from concern updates
  notifications: Notification[] = [];

  // Modal state
  showEventModal = false;
  selectedEvent: Event | null = null;

  constructor(
    private eventService: EventService,
    private eventAttendanceService: EventAttendanceService,
    private concernService: ConcernService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadEvents();
    this.loadEventsJoined();
    this.loadConcerns();
    this.loadNotifications();
  }

  loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const firstName = user.firstName || '';
      const lastName = user.lastName || '';

      this.userName = firstName;
      this.fullName = `${firstName} ${lastName}`.trim();
      this.userEmail = user.email || '';
      this.currentUserId = user.userId || null;
      this.currentYouthId = user.youthId || null;

      const firstInitial = firstName.charAt(0).toUpperCase();
      const lastInitial = lastName.charAt(0).toUpperCase();
      this.userInitials = `${firstInitial}${lastInitial}`;
    }
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events) => {
        console.log('Youth Dashboard - Fetched events:', events);

        if (events && events.length > 0) {
          const now = new Date();
          const todayStr = now.toISOString().split('T')[0];

          const upcomingEvents = events.filter(event => {
            const eventDateStr = event.eventDate.split('T')[0];
            return eventDateStr >= todayStr;
          });

          this.events = upcomingEvents
            .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
            .slice(0, 3);

          this.upcomingEvents = upcomingEvents.length;
        }

        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error loading events:', error);
        this.cdr.detectChanges();
      }
    );
  }

  openEventDetails(event: Event): void {
    this.selectedEvent = event;
    this.showEventModal = true;
    this.cdr.detectChanges();
  }

  closeEventModal(): void {
    this.showEventModal = false;
    this.selectedEvent = null;
    this.cdr.detectChanges();
  }

  loadEventsJoined(): void {
    if (!this.currentUserId) {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        this.currentUserId = user.userId || null;
      }
    }

    if (this.currentUserId) {
      this.eventAttendanceService.getUserEvents(this.currentUserId).subscribe(
        (attendances) => {
          console.log('Youth Dashboard - Events joined:', attendances);
          this.eventsJoined = attendances ? attendances.length : 0;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error loading events joined:', error);
          this.eventsJoined = 0;
          this.cdr.detectChanges();
        }
      );
    }
  }

  loadConcerns(): void {
    if (!this.currentYouthId) {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        this.currentYouthId = user.youthId || null;
      }
    }

    if (this.currentYouthId) {
      this.concernService.getConcernsByYouthId(this.currentYouthId).subscribe(
        (concerns) => {
          console.log('Youth Dashboard - My concerns:', concerns);

          if (concerns && concerns.length > 0) {
            this.myConcerns = concerns.length;

            // Count resolved concerns
            this.resolvedConcerns = concerns.filter(concern =>
              concern.status?.toLowerCase() === 'resolved' ||
              concern.status?.toLowerCase() === 'closed'
            ).length;
          } else {
            this.myConcerns = 0;
            this.resolvedConcerns = 0;
          }

          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error loading concerns:', error);
          this.myConcerns = 0;
          this.resolvedConcerns = 0;
          this.cdr.detectChanges();
        }
      );
    }
  }

  loadNotifications(): void {
    if (!this.currentYouthId) {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        this.currentYouthId = user.youthId || null;
      }
    }

    if (this.currentYouthId) {
      this.concernService.getConcernUpdatesByYouthId(this.currentYouthId).subscribe(
        (updates) => {
          console.log('Youth Dashboard - Fetched concern updates:', updates);

          if (updates && updates.length > 0) {
            // Convert concern updates to notifications
            this.notifications = updates
              .sort((a, b) => {
                const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return dateB - dateA; // Most recent first
              })
              .slice(0, 5) // Show only 5 most recent
              .map(update => ({
                id: update.updateId || 0,
                title: `Admin Response to Concern #${update.concernId}`,
                message: update.updateText || '',
                date: new Date(update.createdAt || new Date())
              }));
          } else {
            this.notifications = [];
          }

          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error loading notifications:', error);
          this.notifications = [];
          this.cdr.detectChanges();
        }
      );
    }
  }
}
