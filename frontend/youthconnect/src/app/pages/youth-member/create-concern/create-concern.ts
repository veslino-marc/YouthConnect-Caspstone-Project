import { Component } from '@angular/core';
import { YouthSidebar } from '../../../shared/components/youth-sidebar/youth-sidebar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConcernService } from '../../../services/concern.service';
import { ConcernDTO } from '../../../models/concern.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-concern',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, YouthSidebar],
  templateUrl: './create-concern.html',
  styleUrl: './create-concern.scss',
})
export class CreateConcern {
  concernForm: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  currentYouthId: number | null = null;

  typeOfConcernOptions = [
    { value: 'Project Concern', label: 'Project Concern' },
    { value: 'Community Concern', label: 'Community Concern' },
    { value: 'System Concern', label: 'System Concern' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private concernService: ConcernService,
    private router: Router
  ) {
    this.concernForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      typeOfConcern: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Get the current logged-in youth user ID from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        this.currentYouthId = user.userId || user.id;
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    }
  }

  get title() { return this.concernForm.get('title'); }
  get typeOfConcern() { return this.concernForm.get('typeOfConcern'); }
  get description() { return this.concernForm.get('description'); }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.concernForm.invalid) {
      return;
    }
    if (!this.currentYouthId) {
      this.errorMessage = 'User ID not found. Please log in again.';
      return;
    }

    this.loading = true;
    const formData = this.concernForm.value;
    const concernDTO: ConcernDTO = {
      youthId: this.currentYouthId,
      title: formData.title,
      typeOfConcern: formData.typeOfConcern,
      description: formData.description
    };

    this.concernService.createConcern(concernDTO).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = 'Concern submitted successfully!';
        this.concernForm.reset();
        this.submitted = false;
        setTimeout(() => { this.successMessage = ''; }, 5000);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Failed to submit concern. Please try again.';
        setTimeout(() => { this.errorMessage = ''; }, 5000);
      }
    });
  }

  resetForm() {
    this.concernForm.reset();
    this.submitted = false;
  }
}