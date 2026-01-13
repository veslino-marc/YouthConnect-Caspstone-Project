import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-manage-sk-officials',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './manage-sk-officials.html',
  styleUrls: ['./manage-sk-officials.scss']
})
export class ManageSkOfficialsPage implements OnInit {
  skOfficials: any[] = [];
  showForm: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = true;
  currentOfficial: any = {
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: ''
  };
  editingId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadSkOfficials();
  }

  loadSkOfficials() {
    this.isLoading = true;
    this.adminService.getAllAdmins().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.skOfficials = data || [];
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.errorMessage = 'Failed to load SK Officials';
          this.isLoading = false;
          this.cdr.detectChanges();
        });
        console.error('Error loading SK Officials:', err);
      }
    });
  }

  openForm() {
    this.showForm = true;
    this.isEditing = false;
    this.currentOfficial = {
      firstName: '',
      lastName: '',
      email: '',
      passwordHash: ''
    };
    this.errorMessage = '';
  }

  editOfficial(official: any) {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = official.adminId || null;
    this.currentOfficial = { ...official };
    this.errorMessage = '';
  }

  saveOfficial() {
    if (!this.currentOfficial.firstName || !this.currentOfficial.lastName || !this.currentOfficial.email) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.isEditing && this.editingId) {
      this.adminService.updateAdmin(this.editingId, this.currentOfficial).subscribe({
        next: () => {
          this.successMessage = 'SK Official updated successfully';
          this.showForm = false;
          this.loadSkOfficials();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to update SK Official';
        }
      });
    } else {
      this.adminService.createAdmin(this.currentOfficial).subscribe({
        next: () => {
          this.successMessage = 'SK Official created successfully';
          this.showForm = false;
          this.loadSkOfficials();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to create SK Official';
        }
      });
    }
  }

  deleteOfficial(id: number | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this SK Official?')) {
      this.adminService.deleteAdmin(id).subscribe({
        next: () => {
          this.successMessage = 'SK Official deleted successfully';
          this.loadSkOfficials();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: () => {
          this.errorMessage = 'Failed to delete SK Official';
        }
      });
    }
  }

  deactivateOfficial(id: number | undefined) {
    if (!id) return;
    this.adminService.deactivateAdmin(id).subscribe({
      next: () => {
        this.successMessage = 'SK Official deactivated successfully';
        this.loadSkOfficials();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to deactivate SK Official';
      }
    });
  }

  closeForm() {
    this.showForm = false;
    this.errorMessage = '';
  }

  goBack() {
    this.router.navigate(['/administrator/dashboard']);
  }
}
