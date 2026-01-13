import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';
import { HttpClient } from '@angular/common/http';

interface BackupInfo {
    filename: string;
    createdAt: string;
    size: string;
}

@Component({
    selector: 'app-backup-restore',
    standalone: true,
    imports: [SkSidebar, CommonModule],
    templateUrl: './backup-restore.html',
    styleUrl: './backup-restore.scss',
})
export class BackupRestore implements OnInit {
    backups: BackupInfo[] = [];
    isLoading = false;
    isBackingUp = false;
    isRestoring = false;
    successMessage = '';
    errorMessage = '';
    selectedFile: File | null = null;

    private apiUrl = 'http://localhost:8080/api/backup';

    constructor(
        private http: HttpClient,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadBackups();
    }

    loadBackups(): void {
        this.isLoading = true;
        this.http.get<BackupInfo[]>(`${this.apiUrl}/list`).subscribe(
            (backups) => {
                this.backups = backups || [];
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            (error) => {
                console.error('Error loading backups:', error);
                this.backups = [];
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        );
    }

    createBackup(): void {
        this.isBackingUp = true;
        this.successMessage = '';
        this.errorMessage = '';

        this.http.post(`${this.apiUrl}/create`, {}, { responseType: 'blob' }).subscribe(
            (blob) => {
                // Download the backup file
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                a.download = `youthconnect_backup_${timestamp}.sql`;
                a.click();
                window.URL.revokeObjectURL(url);

                this.successMessage = 'Backup created and downloaded successfully!';
                this.isBackingUp = false;
                this.loadBackups();
                this.cdr.detectChanges();

                setTimeout(() => {
                    this.successMessage = '';
                    this.cdr.detectChanges();
                }, 5000);
            },
            (error) => {
                console.error('Error creating backup:', error);
                this.errorMessage = 'Failed to create backup. Please try again.';
                this.isBackingUp = false;
                this.cdr.detectChanges();

                setTimeout(() => {
                    this.errorMessage = '';
                    this.cdr.detectChanges();
                }, 5000);
            }
        );
    }

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.cdr.detectChanges();
        }
    }

    restoreBackup(): void {
        if (!this.selectedFile) {
            this.errorMessage = 'Please select a backup file first.';
            setTimeout(() => {
                this.errorMessage = '';
                this.cdr.detectChanges();
            }, 3000);
            return;
        }

        if (!confirm('Are you sure you want to restore this backup? This will overwrite all current data.')) {
            return;
        }

        this.isRestoring = true;
        this.successMessage = '';
        this.errorMessage = '';

        const formData = new FormData();
        formData.append('file', this.selectedFile);

        this.http.post(`${this.apiUrl}/restore`, formData).subscribe(
            () => {
                this.successMessage = 'Database restored successfully!';
                this.isRestoring = false;
                this.selectedFile = null;
                this.cdr.detectChanges();

                setTimeout(() => {
                    this.successMessage = '';
                    this.cdr.detectChanges();
                }, 5000);
            },
            (error) => {
                console.error('Error restoring backup:', error);
                this.errorMessage = 'Failed to restore backup. Please ensure the file is valid.';
                this.isRestoring = false;
                this.cdr.detectChanges();

                setTimeout(() => {
                    this.errorMessage = '';
                    this.cdr.detectChanges();
                }, 5000);
            }
        );
    }

    downloadBackup(backup: BackupInfo): void {
        this.http.get(`${this.apiUrl}/download/${backup.filename}`, { responseType: 'blob' }).subscribe(
            (blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = backup.filename;
                a.click();
                window.URL.revokeObjectURL(url);
            },
            (error) => {
                console.error('Error downloading backup:', error);
                this.errorMessage = 'Failed to download backup.';
                setTimeout(() => {
                    this.errorMessage = '';
                    this.cdr.detectChanges();
                }, 3000);
            }
        );
    }

    deleteBackup(backup: BackupInfo): void {
        if (!confirm(`Are you sure you want to delete "${backup.filename}"?`)) {
            return;
        }

        this.http.delete(`${this.apiUrl}/delete/${backup.filename}`).subscribe(
            () => {
                this.successMessage = 'Backup deleted successfully!';
                this.loadBackups();
                setTimeout(() => {
                    this.successMessage = '';
                    this.cdr.detectChanges();
                }, 3000);
            },
            (error) => {
                console.error('Error deleting backup:', error);
                this.errorMessage = 'Failed to delete backup.';
                setTimeout(() => {
                    this.errorMessage = '';
                    this.cdr.detectChanges();
                }, 3000);
            }
        );
    }
}
