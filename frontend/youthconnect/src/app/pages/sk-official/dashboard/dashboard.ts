import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';
import { EventService } from '../../../services/event.service';
import { ConcernService } from '../../../services/concern.service';
import type { Event } from '../../../models/event.model';
import type { Concern } from '../../../models/concern.model';
import { DatePipe, CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SkSidebar, RouterLink, DatePipe, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  userName = '';
  userEmail = '';
  userInitials = '';
  fullName = '';

  // Stats
  activeTasks = 3;
  upcomingEvents = 0;
  pendingConcerns = 0;
  youthMembers = 342;

  // Sample tasks data
  tasks: Task[] = [
    { id: 1, title: 'Prepare Sports Festival Budget' },
    { id: 2, title: 'Prepare Sports Festival Budget' },
    { id: 3, title: 'Prepare Sports Festival Budget' }
  ];

  // Real events data from backend
  events: Event[] = [];

  // Real concerns data from backend
  concerns: Concern[] = [];

  // Modal state
  showEventModal = false;
  selectedEvent: Event | null = null;

  constructor(
    private eventService: EventService,
    private concernService: ConcernService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUserData();
    this.loadEvents();
    this.loadConcerns();
  }

  loadUserData(): void {
    let userData = localStorage.getItem('user');
    if (!userData) {
      userData = localStorage.getItem('admin');
    }

    if (userData) {
      const user = JSON.parse(userData);
      const firstName = user.firstName || '';
      const lastName = user.lastName || '';

      this.userName = firstName;
      this.fullName = `${firstName} ${lastName}`.trim();
      this.userEmail = user.email || '';

      const firstInitial = firstName.charAt(0).toUpperCase();
      const lastInitial = lastName.charAt(0).toUpperCase();
      this.userInitials = `${firstInitial}${lastInitial}`;
    }
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe(
      (events) => {
        console.log('Dashboard - Fetched events:', events);

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

  loadConcerns(): void {
    this.concernService.getAllConcerns().subscribe(
      (concerns) => {
        console.log('Dashboard - Fetched concerns:', concerns);

        if (concerns && concerns.length > 0) {
          // Filter for pending/open concerns
          const pendingConcerns = concerns.filter(concern =>
            concern.status?.toLowerCase() === 'open' ||
            concern.status?.toLowerCase() === 'pending'
          );

          this.concerns = pendingConcerns.slice(0, 3);
          this.pendingConcerns = pendingConcerns.length;
        } else {
          this.pendingConcerns = 0;
        }

        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error loading concerns:', error);
        this.cdr.detectChanges();
      }
    );
  }
}
