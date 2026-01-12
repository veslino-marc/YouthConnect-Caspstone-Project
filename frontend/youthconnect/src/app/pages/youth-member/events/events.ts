import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { YouthSidebar } from '../../../shared/components/youth-sidebar/youth-sidebar';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';
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

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.loading = true;
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
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
}
