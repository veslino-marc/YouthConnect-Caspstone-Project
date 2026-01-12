import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { YouthProfileService } from '../../services/youth-profile.service';
import { YouthProfile } from '../../models/youth-profile.model';

interface YouthClassification {
  youthClassification: string;
  educationBackground: string;
  workStatus: string;
  skVoter: boolean;
  nationalVoter: boolean;
  pastVoter: boolean;
  numAttendedAssemblies: number;
  nonAttendanceReason?: string;
}

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  currentStep = 1;
  totalSteps = 2;
  
  profile: YouthProfile = {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    gender: '',
    birthday: '',
    contactNumber: '',
    completeAddress: '',
    civilStatus: ''
  };
  
  classification: YouthClassification = {
    youthClassification: '',
    educationBackground: '',
    workStatus: '',
    skVoter: false,
    nationalVoter: false,
    pastVoter: false,
    numAttendedAssemblies: 0,
    nonAttendanceReason: ''
  };
  
  loading = false;
  success = false;
  error: string | null = null;

  constructor(
    private youthProfileService: YouthProfileService,
    private router: Router
  ) {}

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStep1Valid(): boolean {
    return !!(this.profile.firstName && this.profile.lastName && 
             this.profile.gender && this.profile.birthday && 
             this.profile.contactNumber && this.profile.completeAddress && 
             this.profile.civilStatus);
  }

  isStep2Valid(): boolean {
    return !!(this.classification.youthClassification && 
             this.classification.educationBackground && 
             this.classification.workStatus);
  }

  register() {
    this.loading = true;
    this.success = false;
    this.error = null;
    
    const registrationData = {
      ...this.profile,
      classification: this.classification
    };
    
    this.youthProfileService.registerYouth(registrationData).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.error = 'Registration failed. Please try again.';
        this.loading = false;
      }
    });
  }
}
