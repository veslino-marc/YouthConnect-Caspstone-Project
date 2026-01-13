import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';
import { AdminService, Admin } from '../../../services/admin.service';

@Component({
  selector: 'app-manage-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, SkSidebar],
  templateUrl: './manage-admin.html',
  styleUrl: './manage-admin.scss'
})
export class ManageAdminPage implements OnInit {
  admins: Admin[] = [];
  loading = false;
  error: string | null = null;
  success: string | null = null;

  // Form state
  showForm = false;
  editingId: number | null = null;
  formData: Admin = {
    firstName: '',
    lastName: '',
    email: '',
    passwordHash: ''
  };

  // Inline edit state
  editingRowId: number | null = null;
  editingData: { [key: number]: Admin } = {};

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.loading = true;
    this.adminService.getAllAdmins().subscribe({
      next: (data) => {
        this.admins = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load admins';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  openForm(): void {
    this.showForm = true;
    this.editingId = null;
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      passwordHash: ''
    };
    this.cdr.detectChanges();
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      passwordHash: ''
    };
    this.cdr.detectChanges();
  }

  submitForm(): void {
    if (!this.formData.firstName || !this.formData.lastName || !this.formData.email || !this.formData.passwordHash) {
      this.error = 'All fields are required';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    if (this.editingId) {
      this.adminService.updateAdmin(this.editingId, this.formData).subscribe({
        next: () => {
          this.success = 'Admin updated successfully';
          this.loading = false;
          this.closeForm();
          this.loadAdmins();
        },
        error: () => {
          this.error = 'Failed to update admin';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.adminService.createAdmin(this.formData).subscribe({
        next: () => {
          this.success = 'Admin created successfully';
          this.loading = false;
          this.closeForm();
          this.loadAdmins();
        },
        error: () => {
          this.error = 'Failed to create admin';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  editAdmin(admin: Admin): void {
    this.editingId = admin.adminId || null;
    this.formData = { ...admin };
    this.showForm = true;
    this.cdr.detectChanges();
  }

  startInlineEdit(admin: Admin): void {
    this.editingRowId = admin.adminId || null;
    this.editingData[admin.adminId || 0] = { ...admin };
    this.cdr.detectChanges();
  }

  cancelInlineEdit(): void {
    this.editingRowId = null;
    this.editingData = {};
    this.cdr.detectChanges();
  }

  saveInlineEdit(adminId: number | undefined): void {
    if (!adminId) return;

    const editedAdmin = this.editingData[adminId];
    if (!editedAdmin.firstName || !editedAdmin.lastName || !editedAdmin.email) {
      this.error = 'All fields are required';
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    this.adminService.updateAdmin(adminId, editedAdmin).subscribe({
      next: () => {
        this.success = 'Admin updated successfully';
        this.loading = false;
        this.editingRowId = null;
        this.editingData = {};
        this.loadAdmins();
      },
      error: () => {
        this.error = 'Failed to update admin';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteAdmin(adminId: number | undefined): void {
    if (!adminId) return;

    if (!confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    this.adminService.deleteAdmin(adminId).subscribe({
      next: () => {
        this.success = 'Admin deleted successfully';
        this.loading = false;
        this.loadAdmins();
      },
      error: () => {
        this.error = 'Failed to delete admin';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deactivateAdmin(adminId: number | undefined): void {
    if (!adminId) return;

    if (!confirm('Are you sure you want to deactivate this admin?')) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = null;

    this.adminService.deactivateAdmin(adminId).subscribe({
      next: () => {
        this.success = 'Admin deactivated successfully';
        this.loading = false;
        this.loadAdmins();
      },
      error: () => {
        this.error = 'Failed to deactivate admin';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  isEditing(adminId: number | undefined): boolean {
    return this.editingRowId === adminId;
  }
}
