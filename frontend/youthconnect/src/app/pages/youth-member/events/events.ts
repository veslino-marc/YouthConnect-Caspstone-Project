import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { YouthSidebar } from '../../../shared/components/youth-sidebar/youth-sidebar';
import { EventService } from '../../../services/event.service';
import { EventAttendanceService } from '../../../services/event-attendance.service';
import { Event } from '../../../models/event.model';
import { EventAttendance } from '../../../models/event-attendance.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [YouthSidebar, CommonModule, FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  paginatedEvents: Event[] = [];
  loading = true;
  errorMessage = '';

  // Search and sort state
  searchTerm = '';
  sortColumn: keyof Event | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination state
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 1;
  Math = Math;

  // Registration modal state
  showRegistrationModal = false;
  selectedEvent: Event | null = null;
  registrationMessage = '';
  registrationMessageType: 'success' | 'error' = 'success';
  isSubmitting = false;

  // Track registered events
  registeredEventIds: Set<number> = new Set();
  currentUserId: number | null = null;

  constructor(
    private eventService: EventService,
    private attendanceService: EventAttendanceService,
    private cdr: ChangeDetectorRef
  ) {
    // Extract user ID from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserId = user.userId || user.id;
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    }
  }

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.loading = true;
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        // Check registration status for all events if user is logged in
        if (this.currentUserId) {
          this.checkRegistrationStatus();
        }
        this.applyFilters();
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load events.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  checkRegistrationStatus() {
    if (!this.currentUserId) return;

    this.events.forEach(event => {
      if (event.eventId) {
        this.attendanceService.checkRegistration(event.eventId, this.currentUserId!).subscribe({
          next: (isRegistered) => {
            if (isRegistered) {
              this.registeredEventIds.add(event.eventId!);
            }
            this.cdr.markForCheck();
          },
          error: (err) => {
            console.error('Error checking registration status:', err);
          }
        });
      }
    });
  }

  isUserRegistered(eventId: number | undefined): boolean {
    if (!eventId) return false;
    return this.registeredEventIds.has(eventId);
  }

  onSearchChange() {
    this.applyFilters();
    this.cdr.markForCheck();
  }

  onSort(column: keyof Event) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
    this.cdr.markForCheck();
  }

  applyFilters() {
    let filtered = [...this.events];
    
    // Search
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      filtered = filtered.filter(e =>
        (e.title && e.title.toLowerCase().includes(term)) ||
        (e.description && e.description.toLowerCase().includes(term)) ||
        (e.location && e.location.toLowerCase().includes(term))
      );
    }

    // Sort
    if (this.sortColumn) {
      const col = this.sortColumn;
      filtered = filtered.sort((a, b) => {
        const aVal = a[col];
        const bVal = b[col];
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.filteredEvents = filtered;
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvents = this.filteredEvents.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      this.cdr.markForCheck();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisible - 1);
    startPage = Math.max(1, endPage - maxVisible + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Registration Modal Methods
  openRegistrationModal(event: Event) {
    this.selectedEvent = event;
    this.showRegistrationModal = true;
    this.registrationMessage = '';
    this.cdr.markForCheck();
  }

  closeRegistrationModal() {
    this.showRegistrationModal = false;
    this.selectedEvent = null;
    this.registrationMessage = '';
    this.isSubmitting = false;
    this.cdr.markForCheck();
  }

  registerForEvent() {
    if (!this.selectedEvent) return;

    // Get userId from localStorage user object
    const userStr = localStorage.getItem('user');
    let userId: number | null = null;

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        userId = user.userId || user.id;
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    }

    if (!userId) {
      this.registrationMessage = 'Error: User ID not found. Please log in again.';
      this.registrationMessageType = 'error';
      this.cdr.markForCheck();
      return;
    }

    this.isSubmitting = true;
    const attendance: EventAttendance = {
      eventId: this.selectedEvent.eventId!,
      userId: userId,
      isAttended: false
    };

    this.attendanceService.registerForEvent(attendance).subscribe({
      next: (result) => {
        this.registrationMessage = 'Successfully registered for this event!';
        this.registrationMessageType = 'success';
        this.isSubmitting = false;
        this.cdr.markForCheck();
        // Close modal after 2 seconds
        setTimeout(() => this.closeRegistrationModal(), 2000);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.registrationMessage = err.error?.message || 'Failed to register. Please try again.';
        this.registrationMessageType = 'error';
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }
    });
  }

  getStatusDisplay(status: string | undefined): string {
    switch (status) {
      case 'waiting':
        return '⏳ Waiting';
      case 'ongoing':
        return '🔄 Ongoing';
      case 'completed':
        return '✓ Completed';
      case 'deleted':
        return '🗑️ Deleted';
      default:
        return status || 'Unknown';
    }
  }
}
