import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';
import { YouthProfileService } from '../../../services/youth-profile.service';
import { YouthProfileWithClassification, YouthProfileDTO, YouthClassification } from '../../../models/youth-profile.model';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-manage-profiling',
  standalone: true,
  imports: [SkSidebar, CommonModule, FormsModule],
  templateUrl: './manage-profiling.html',
  styleUrl: './manage-profiling.scss',
})
export class ManageProfiling implements OnInit, OnDestroy {
  youthProfiles: YouthProfileWithClassification[] = [];
  showModal: boolean = false;
  isEditMode: boolean = false;
  currentProfile: YouthProfileDTO = this.initializeProfile();
  selectedYouthId?: number;
  isLoading: boolean = false;
  errorMessage: string = '';
  showExportDialog: boolean = false;

  searchTerm: string = '';
  filterGender: string = '';
  filterCivilStatus: string = '';
  filterClassification: string = '';
  filterWorkStatus: string = '';
  filterSkVoter: string = '';
  filterNationalVoter: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  itemsPerPageOptions: number[] = [5, 10, 15, 20, 25];

  constructor(
    private youthProfileService: YouthProfileService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('ManageProfiling component constructed');
  }

  ngOnInit(): void {
    console.log('ManageProfiling ngOnInit called');
    this.loadYouthProfiles();

    // Listen for clicks outside the export popover
    document.addEventListener('click', this.handleOutsideClick);
  }

  ngOnDestroy(): void {
    // Clean up the event listener
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event: MouseEvent) => {
    const popover = document.querySelector('.export-dialog-popover');
    const exportBtn = document.querySelector('.btn-export');
    if (this.showExportDialog && popover && exportBtn) {
      if (!popover.contains(event.target as Node) && !exportBtn.contains(event.target as Node)) {
        this.closeExportDialog();
      }
    }
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

        this.cdr.detectChanges();

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

  get filteredProfiles(): YouthProfileWithClassification[] {
    return this.youthProfiles.filter(profile => {
      const searchLower = this.searchTerm.toLowerCase();
      const matchesSearch = !this.searchTerm ||
        this.getFullName(profile).toLowerCase().includes(searchLower) ||
        profile.contactNumber.toLowerCase().includes(searchLower) ||
        profile.completeAddress.toLowerCase().includes(searchLower) ||
        (profile.youthClassification?.toLowerCase() || '').includes(searchLower) ||
        (profile.educationBackground?.toLowerCase() || '').includes(searchLower);

      const matchesGender = !this.filterGender || profile.gender === this.filterGender;

      const matchesCivilStatus = !this.filterCivilStatus || profile.civilStatus === this.filterCivilStatus;

      const matchesClassification = !this.filterClassification || profile.youthClassification === this.filterClassification;

      const matchesWorkStatus = !this.filterWorkStatus || profile.workStatus === this.filterWorkStatus;

      const matchesSkVoter = !this.filterSkVoter ||
        (this.filterSkVoter === 'yes' && profile.skVoter) ||
        (this.filterSkVoter === 'no' && !profile.skVoter);

      const matchesNationalVoter = !this.filterNationalVoter ||
        (this.filterNationalVoter === 'yes' && profile.nationalVoter) ||
        (this.filterNationalVoter === 'no' && !profile.nationalVoter);

      return matchesSearch && matchesGender && matchesCivilStatus &&
        matchesClassification && matchesWorkStatus && matchesSkVoter && matchesNationalVoter;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.filterGender = '';
    this.filterCivilStatus = '';
    this.filterClassification = '';
    this.filterWorkStatus = '';
    this.filterSkVoter = '';
    this.filterNationalVoter = '';
    this.currentPage = 1;
  }

  // Paginated profiles for display
  get paginatedProfiles(): YouthProfileWithClassification[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProfiles.slice(startIndex, endIndex);
  }

  // Total pages calculation
  get totalPages(): number {
    return Math.ceil(this.filteredProfiles.length / this.itemsPerPage);
  }

  // Page numbers for pagination display
  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, this.currentPage - 2);
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  // Pagination methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
  }

  // Reset to page 1 when search/filter changes
  onFilterChange(): void {
    this.currentPage = 1;
  }

  exportToPDF(): void {
    const profiles = this.filteredProfiles;
    if (profiles.length === 0) {
      alert('No data to export');
      return;
    }
    const doc = new jsPDF();
    const headers = [
      'Full Name', 'Gender', 'Birthday', 'Contact Number', 'Address',
      'Civil Status', 'Classification', 'Education', 'Work Status',
      'SK Voter', 'National Voter', 'Assemblies Attended'
    ];
    const rows = profiles.map(profile => [
      this.getFullName(profile),
      profile.gender,
      profile.birthday,
      profile.contactNumber,
      profile.completeAddress,
      profile.civilStatus,
      profile.youthClassification || 'N/A',
      profile.educationBackground || 'N/A',
      profile.workStatus || 'N/A',
      profile.skVoter ? 'Yes' : 'No',
      profile.nationalVoter ? 'Yes' : 'No',
      profile.numAttendedAssemblies || '0'
    ]);
    autoTable(doc, {
      head: [headers],
      body: rows,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [33, 150, 243] },
      margin: { top: 20 }
    });
    doc.save(`youth_profiles_${new Date().toISOString().split('T')[0]}.pdf`);
  }

  exportToExcel(): void {
    const profiles = this.filteredProfiles;
    if (profiles.length === 0) {
      alert('No data to export');
      return;
    }
    const headers = [
      'Full Name', 'Gender', 'Birthday', 'Contact Number', 'Address',
      'Civil Status', 'Classification', 'Education', 'Work Status',
      'SK Voter', 'National Voter', 'Assemblies Attended'
    ];
    const rows = profiles.map(profile => [
      this.getFullName(profile),
      profile.gender,
      profile.birthday,
      profile.contactNumber,
      profile.completeAddress,
      profile.civilStatus,
      profile.youthClassification || 'N/A',
      profile.educationBackground || 'N/A',
      profile.workStatus || 'N/A',
      profile.skVoter ? 'Yes' : 'No',
      profile.nationalVoter ? 'Yes' : 'No',
      profile.numAttendedAssemblies || '0'
    ]);
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Youth Profiles');
    XLSX.writeFile(workbook, `youth_profiles_${new Date().toISOString().split('T')[0]}.xlsx`);
  }

  openExportDialog(): void {
    this.showExportDialog = true;
  }

  closeExportDialog(): void {
    this.showExportDialog = false;
  }
}
