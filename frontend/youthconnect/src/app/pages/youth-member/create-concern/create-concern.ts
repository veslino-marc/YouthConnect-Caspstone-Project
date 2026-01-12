import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConcernService } from '../../../services/concern.service';
import { ConcernDTO } from '../../../models/concern.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-concern',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-concern.html',
  styleUrl: './create-concern.scss',
})
export class CreateConcern {
  concernData = {
    title: '',
    concernType: '',
    description: ''
  };

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private concernService: ConcernService
  ) { }

  onSubmit() {
    if (!this.concernData.title || !this.concernData.concernType 
        || !this.concernData.description) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    // TODO: Replace with actual logged-in youth ID
    const concernDTO: ConcernDTO = {
      youthId: 1, // Replace this with actual logged-in user ID
      typeOfConcern: this.concernData.concernType,
      title: this.concernData.title,
      description: this.concernData.description
    };

    console.log('Sending concern data:', concernDTO);

    this.concernService.createConcern(concernDTO).subscribe({
      next: (response) => {
        console.log('Concern created successfully:', response);
        this.successMessage = 'Concern submitted successfully!';
        this.isSubmitting = false;

        // Clear the form
        this.concernData = {
          title: '',
          concernType: '',
          description: ''
        };

        // Navigate back after 2 seconds or just stay on page
        setTimeout(() => {
          // Remove navigation or change to a valid route
          // this.router.navigate(['/']);
        }, 2000);
      },
      error: (error) => {
        console.error('Full error object:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error details:', error.error);
        this.errorMessage = `Failed to submit concern: ${error.error?.message 
          || error.message || 'Please try again'}`;
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    // Navigate to home or just go back
    this.router.navigate(['/']);
  }
}