import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { YouthSidebar } from '../../../shared/components/youth-sidebar/youth-sidebar';

interface Event {
  id: number;
  date: string;
  time: string;
  name: string;
  location: string;
}

interface Notification {
  id: number;
  title: string;
  message: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [YouthSidebar, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  userName = '';
  userEmail = '';
  userInitials = '';
  fullName = '';

  // Stats
  myConcerns = 5;
  upcomingEvents = 5;
  eventsJoined = 3;
  resolvedConcerns = 2;

  // Sample events data
  events: Event[] = [
    {
      id: 1,
      date: 'December 15, 2025',
      time: '8:00 AM',
      name: 'Event Example',
      location: 'Barangay Hall, Pasay City'
    },
    {
      id: 2,
      date: 'December 15, 2025',
      time: '8:00 AM',
      name: 'Event Example',
      location: 'Barangay Hall, Pasay City'
    },
    {
      id: 3,
      date: 'December 15, 2025',
      time: '8:00 AM',
      name: 'Event Example',
      location: 'Barangay Hall, Pasay City'
    }
  ];

  // Sample notifications data
  notifications: Notification[] = [
    {
      id: 1,
      title: 'New Event Added',
      message: 'Youth Leadership Summit registration is now open'
    },
    {
      id: 2,
      title: 'New Event Added',
      message: 'Youth Leadership Summit registration is now open'
    },
    {
      id: 3,
      title: 'Concern Resolved',
      message: 'Your Concern has been addressed'
    }
  ];

  ngOnInit(): void {
    this.loadUserData();
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

      // Generate initials from first and last name
      const firstInitial = firstName.charAt(0).toUpperCase();
      const lastInitial = lastName.charAt(0).toUpperCase();
      this.userInitials = `${firstInitial}${lastInitial}`;
    }
  }
}
