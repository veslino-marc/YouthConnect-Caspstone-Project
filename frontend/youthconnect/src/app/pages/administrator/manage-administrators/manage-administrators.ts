import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministratorService, Administrator } from '../../../services/administrator.service';

@Component({
  selector: 'app-manage-administrators',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './manage-administrators.html',
  styleUrls: ['./manage-administrators.scss']
})
export class ManageAdministratorsPage implements OnInit {
  administrators: Administrator[] = [];
  showForm: boolean = false;
  isEditing: boolean = false;
  isLoading: boolean = true;
  currentAdministrator: Administrator = {
    username: '',
    email: '',
    passwordHash: ''
  };
  editingId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private administratorService: AdministratorService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadAdministrators();
  }

  loadAdministrators() {
    this.isLoading = true;
    this.administratorService.getAllAdministrators().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.administrators = data || [];
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.errorMessage = 'Failed to load administrators';
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  openForm() {
    this.showForm = true;
    this.isEditing = false;
    this.currentAdministrator = {
      username: '',
      email: '',
      passwordHash: ''
    };
    this.errorMessage = '';
  }

  editAdministrator(admin: Administrator) {
    this.showForm = true;
    this.isEditing = true;
    this.editingId = admin.administratorId || null;
    this.currentAdministrator = { ...admin };
    this.errorMessage = '';
  }

  saveAdministrator() {
    if (!this.currentAdministrator.username || !this.currentAdministrator.email || !this.currentAdministrator.passwordHash) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.isEditing && this.editingId) {
      this.administratorService.updateAdministrator(this.editingId, this.currentAdministrator).subscribe({
        next: () => {
          this.successMessage = 'Administrator updated successfully';
          this.showForm = false;
          this.loadAdministrators();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to update administrator';
          console.error('Error updating administrator:', err);
        }
      });
    } else {
      this.administratorService.createAdministrator(this.currentAdministrator).subscribe({
        next: () => {
          this.successMessage = 'Administrator created successfully';
          this.showForm = false;
          this.loadAdministrators();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to create administrator';
          console.error('Error creating administrator:', err);
        }
      });
    }
  }

  deleteAdministrator(id: number | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this administrator?')) {
      this.administratorService.deleteAdministrator(id).subscribe({
        next: () => {
          this.successMessage = 'Administrator deleted successfully';
          this.loadAdministrators();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete administrator';
          console.error('Error deleting administrator:', err);
        }
      });
    }
  }

  deactivateAdministrator(id: number | undefined) {
    if (!id) return;
    this.administratorService.deactivateAdministrator(id).subscribe({
      next: () => {
        this.successMessage = 'Administrator deactivated successfully';
        this.loadAdministrators();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to deactivate administrator';
        console.error('Error deactivating administrator:', err);
      }
    });
  }

  activateAdministrator(id: number | undefined) {
    if (!id) return;
    this.administratorService.activateAdministrator(id).subscribe({
      next: () => {
        this.successMessage = 'Administrator activated successfully';
        this.loadAdministrators();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.errorMessage = 'Failed to activate administrator';
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
