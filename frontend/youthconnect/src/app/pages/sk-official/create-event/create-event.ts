import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [SkSidebar, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-event.html',
  styleUrl: './create-event.scss',
})
export class CreateEvent {
  eventForm: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  currentAdminId: number | null = null;

  constructor(private formBuilder: FormBuilder, private eventService: EventService) {
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
