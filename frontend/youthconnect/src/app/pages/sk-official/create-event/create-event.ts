import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [SkSidebar, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-event.html',
  styleUrl: './create-event.scss',
})
export class CreateEvent implements OnInit {
  eventForm: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  currentAdminId: number | null = null;
  events: Event[] = [];
  filteredEvents: Event[] = [];
  showForm = false;
  eventsLoading = false;

  // Search and sort state
  searchTerm = '';
  sortColumn: keyof Event | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private cdr: ChangeDetectorRef) {
    this.eventForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      event_date: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(3)]],
    });

    // Get the current logged-in admin ID from localStorage
    const adminData = localStorage.getItem('admin');
    console.log('Admin data from localStorage:', adminData);
    
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        console.log('Parsed admin object:', admin);
        this.currentAdminId = admin.adminId;
        console.log('Current Admin ID:', this.currentAdminId);
      } catch (e) {
        console.error('Error parsing admin data from localStorage:', e);
      }
    } else {
      console.warn('No admin data found in localStorage');
    }
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventsLoading = true;
    this.eventService.getAllEvents().subscribe(
      (response) => {
        console.log('Events loaded:', response);
        this.events = response;
        this.applyFiltersAndSort();
        this.eventsLoading = false;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error loading events:', error);
        this.eventsLoading = false;
        this.cdr.markForCheck();
      }
    );
  }

  onSearchChange() {
    this.applyFiltersAndSort();
    this.cdr.markForCheck();
  }

  onSort(column: keyof Event) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
    this.cdr.markForCheck();
  }

  applyFiltersAndSort() {
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
  }

  // Export filtered events to CSV
  exportToCSV() {
    const headers = ['Title', 'Description', 'Date & Time', 'Location'];
    const rows = this.filteredEvents.map(e => [
      e.title,
      e.description,
      e.eventDate ? new Date(e.eventDate).toLocaleString() : '',
      e.location
    ]);
    let csvContent = '';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(field => '"' + (field ? String(field).replace(/"/g, '""') : '') + '"').join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'events.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Export filtered events to PDF
  async exportToPDF() {
    // Dynamically import jsPDF and autoTable
    const jsPDFModule = await import('jspdf');
    const autoTableModule = await import('jspdf-autotable');
    const doc = new jsPDFModule.jsPDF();
    const headers = [['Title', 'Description', 'Date & Time', 'Location']];
    const rows = this.filteredEvents.map(e => [
      e.title,
      e.description,
      e.eventDate ? new Date(e.eventDate).toLocaleString() : '',
      e.location
    ]);
    (autoTableModule as any).default(doc, {
      head: headers,
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [0, 82, 204] },
      margin: { top: 20 },
      didDrawPage: (data: any) => {
        doc.text('Events', data.settings.margin.left, 10);
      }
    });
    doc.save('events.pdf');
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.eventForm.invalid) {
      return;
    }

    if (!this.currentAdminId) {
      this.errorMessage = 'Admin ID not found. Please log in again.';
      return;
    }

    this.loading = true;
    const formData = this.eventForm.value;
    
    console.log('Form Data:', formData);
    
    // Map form field names to API field names
    const eventData = {
      title: formData.title,
      description: formData.description,
      eventDate: formData.event_date,
      location: formData.location,
      createdByAdminId: this.currentAdminId
    };

    this.eventService.createEvent(eventData).subscribe(
      (response) => {
        console.log('Event Created Successfully:', response);
        this.loading = false;
        this.successMessage = 'Event created successfully!';
        this.eventForm.reset();
        this.submitted = false;
        this.showForm = false;
        this.loadEvents();
        this.cdr.markForCheck();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      (error) => {
        console.error('Error Creating Event:', error);
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to create event. Please try again.';
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    );
  }

  resetForm() {
    this.eventForm.reset();
    this.submitted = false;
    this.cdr.markForCheck();
  }

  get title() {
    return this.eventForm.get('title');
  }

  get description() {
    return this.eventForm.get('description');
  }

  get event_date() {
    return this.eventForm.get('event_date');
  }

  get location() {
    return this.eventForm.get('location');
  }
}
