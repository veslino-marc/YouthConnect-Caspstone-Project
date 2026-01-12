import { Component, OnInit } from '@angular/core';
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
  
  constructor(private youthProfileService: YouthProfileService) {}
  
  ngOnInit(): void {
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
    this.youthProfileService.getAllYouthProfilesWithClassification().subscribe({
      next: (data) => {
        this.youthProfiles = data;
      },
      error: (error) => {
        console.error('Error loading youth profiles:', error);
        alert('Failed to load youth profiles');
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
    if (this.isEditMode && this.selectedYouthId) {
      // Update existing profile
      this.youthProfileService.updateYouthProfileWithClassification(this.selectedYouthId, this.currentProfile).subscribe({
        next: () => {
          alert('Youth profile updated successfully');
          this.loadYouthProfiles();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating youth profile:', error);
          alert('Failed to update youth profile');
        }
      });
    } else {
      // Create new profile
      this.youthProfileService.registerYouth(this.currentProfile as any).subscribe({
        next: () => {
          alert('Youth profile created successfully');
          this.loadYouthProfiles();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating youth profile:', error);
          alert('Failed to create youth profile');
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
