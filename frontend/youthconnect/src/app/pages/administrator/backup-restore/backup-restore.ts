import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backup-restore',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './backup-restore.html',
  styleUrls: ['./backup-restore.scss']
})
export class BackupRestorePage {
  isLoading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  backupDatabase() {
    this.isLoading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('http://localhost:8080/api/backup/create', {}, { responseType: 'blob' }).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Create a blob link to download
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `youthconnect_backup_${new Date().getTime()}.sql`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.successMessage = 'Database backup created successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to create backup. Please try again.';
        console.error('Error creating backup:', err);
      }
    });
  }

  restoreDatabase() {
    if (confirm('Are you sure you want to restore the database? This will overwrite all current data.')) {
      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';

      // In a real implementation, you would upload a file here
      this.http.post('http://localhost:8080/api/backup/restore', {}).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Database restored successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to restore database. Please try again.';
          console.error('Error restoring database:', err);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/administrator/dashboard']);
  }
}
