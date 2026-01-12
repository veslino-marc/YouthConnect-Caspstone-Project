import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';
import { YouthProfileService } from '../../../services/youth-profile.service';
import { YouthProfileWithClassification, YouthProfileDTO, YouthClassification } from '../../../models/youth-profile.model';

@Component({
  selector: 'app-manage-profiling',
  standalone: true,
  imports: [SkSidebar, CommonModule, FormsModule],
  templateUrl: './manage-profiling.html',
  styleUrl: './manage-profiling.scss',
})
export class ManageProfiling implements OnInit {
  youthProfiles: YouthProfileWithClassification[] = [];
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentProfile: YouthProfileDTO = this.initializeProfile();
  selectedYouthId?: number;
  isLoading: boolean = false;
  errorMessage: string = '';
  
  constructor(
    private youthProfileService: YouthProfileService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('ManageProfiling component constructed');
  }
  
  ngOnInit(): void {
    console.log('ManageProfiling ngOnInit called');
    this.loadYouthProfiles();
  }
  
  initializeProfile(): YouthProfileDTO {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      gender: '',
      birthday: '',
      contactNumber: '',
      completeAddress: '',
      civilStatus: '',
      classification: {
        youthClassification: '',
        educationBackground: '',
        workStatus: '',
        skVoter: false,
        nationalVoter: false,
        pastVoter: false,
        numAttendedAssemblies: 0,
        nonAttendanceReason: ''
      }
    };
  }
  
  loadYouthProfiles(): void {
    console.log('Loading youth profiles...');
    this.isLoading = true;
    this.errorMessage = '';
    
    this.youthProfileService.getAllYouthProfilesWithClassification().subscribe({
      next: (data) => {
        console.log('Youth profiles loaded successfully:', data);
        this.youthProfiles = data || [];
        this.isLoading = false;
        
        // Manually trigger change detection
        this.cdr.detectChanges();
        
        if (this.youthProfiles.length === 0) {
          console.warn('No youth profiles found in database');
        } else {
          console.log(`Loaded ${this.youthProfiles.length} youth profiles`);
        }
      },
      error: (error) => {
        console.error('Error loading youth profiles:', error);
        this.errorMessage = 'Failed to load youth profiles. Please check if the backend server is running.';
        this.isLoading = false;
        this.youthProfiles = [];
        
        // Manually trigger change detection
        this.cdr.detectChanges();
        
        // Show detailed error in console
        if (error.status === 0) {
          console.error('Backend server is not reachable. Make sure it is running on http://localhost:8080');
        } else {
          console.error('Error details:', error.message);
        }
      },
      complete: () => {
        console.log('Youth profiles loading complete');
      }
    });
  }
  
  openAddModal(): void {
    this.isEditMode = false;
    this.currentProfile = this.initializeProfile();
    this.showModal = true;
  }
  
  openEditModal(profile: YouthProfileWithClassification): void {
    this.isEditMode = true;
    this.selectedYouthId = profile.youthId;
    this.currentProfile = {
      firstName: profile.firstName,
      middleName: profile.middleName || '',
      lastName: profile.lastName,
      suffix: profile.suffix || '',
      gender: profile.gender,
      birthday: profile.birthday,
      contactNumber: profile.contactNumber,
      completeAddress: profile.completeAddress,
      civilStatus: profile.civilStatus,
      classification: {
        youthClassification: profile.youthClassification || '',
        educationBackground: profile.educationBackground || '',
        workStatus: profile.workStatus || '',
        skVoter: profile.skVoter || false,
        nationalVoter: profile.nationalVoter || false,
        pastVoter: profile.pastVoter || false,
        numAttendedAssemblies: profile.numAttendedAssemblies || 0,
        nonAttendanceReason: profile.nonAttendanceReason || ''
      }
    };
    this.showModal = true;
  }
  
  closeModal(): void {
    this.showModal = false;
    this.currentProfile = this.initializeProfile();
    this.selectedYouthId = undefined;
  }
  
  saveProfile(): void {
    console.log('Saving profile...', this.isEditMode ? 'Edit Mode' : 'Create Mode');
    console.log('Profile data:', this.currentProfile);
    
    if (this.isEditMode && this.selectedYouthId) {
      // Update existing profile
      this.youthProfileService.updateYouthProfileWithClassification(this.selectedYouthId, this.currentProfile).subscribe({
        next: (response) => {
          console.log('Youth profile updated successfully:', response);
          alert('Youth profile updated successfully');
          this.closeModal();
          this.loadYouthProfiles();
        },
        error: (error) => {
          console.error('Error updating youth profile:', error);
          alert('Failed to update youth profile: ' + (error.message || 'Unknown error'));
        }
      });
    } else {
      // Create new profile
      this.youthProfileService.registerYouth(this.currentProfile as any).subscribe({
        next: (response) => {
          console.log('Youth profile created successfully:', response);
          alert('Youth profile created successfully');
          this.closeModal();
          this.loadYouthProfiles();
        },
        error: (error) => {
          console.error('Error creating youth profile:', error);
          alert('Failed to create youth profile: ' + (error.message || 'Unknown error'));
        }
      });
    }
  }
  
  deleteProfile(youthId?: number): void {
    if (!youthId) return;
    
    if (confirm('Are you sure you want to delete this youth profile?')) {
      this.youthProfileService.deleteYouthProfile(youthId).subscribe({
        next: () => {
          alert('Youth profile deleted successfully');
          this.loadYouthProfiles();
        },
        error: (error) => {
          console.error('Error deleting youth profile:', error);
          alert('Failed to delete youth profile');
        }
      });
    }
  }
  
  getFullName(profile: YouthProfileWithClassification): string {
    const parts = [
      profile.firstName,
      profile.middleName,
      profile.lastName,
      profile.suffix
    ].filter(Boolean);
    return parts.join(' ');
  }
}
