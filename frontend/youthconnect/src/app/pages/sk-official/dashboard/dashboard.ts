import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';

interface Task {
  id: number;
  title: string;
}

interface Event {
  id: number;
  date: string;
  time: string;
  name: string;
  location: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SkSidebar, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  userName = '';
  userEmail = '';
  userInitials = '';
  fullName = '';

  // Stats
  activeTasks = 24;
  upcomingEvents = 5;
  pendingConcerns = 15;
  youthMembers = 342;

  // Sample tasks data
  tasks: Task[] = [
    { id: 1, title: 'Prepare Sports Festival Budget' },
    { id: 2, title: 'Prepare Sports Festival Budget' },
    { id: 3, title: 'Prepare Sports Festival Budget' }
  ];

  // Sample events data
  events: Event[] = [
    {
      id: 1,
      date: 'Dec 10, 2025',
      time: '9:00 AM',
      name: 'Event Example',
      location: 'Commonwealth Hall'
    },
    {
      id: 2,
      date: 'Dec 10, 2025',
      time: '9:00 AM',
      name: 'Event Example',
      location: 'Commonwealth Hall'
    },
    {
      id: 3,
      date: 'Dec 10, 2025',
      time: '9:00 AM',
      name: 'Event Example',
      location: 'Commonwealth Hall'
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
