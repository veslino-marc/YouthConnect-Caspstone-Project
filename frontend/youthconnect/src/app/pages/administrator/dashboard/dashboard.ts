import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from '../../../services/admin.service';
import { YouthProfileService } from '../../../services/youth-profile.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class AdministratorDashboard implements OnInit {
  administrator: { username: string; email: string } | null = null;

  // Statistics
  totalSkOfficials = 0;
  totalYouthMembers = 0;
  activeYouthMembers = 0;
  isLoading = true;

  constructor(
    private adminService: AdminService,
    private youthProfileService: YouthProfileService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.loadAdminData();
    this.loadStatistics();
  }

  loadAdminData(): void {
    const adminData = localStorage.getItem('administrator');
    if (adminData) {
      this.administrator = JSON.parse(adminData);
      this.cdr.detectChanges();
    }
  }

  loadStatistics(): void {
    this.isLoading = true;
    
    // Load SK Officials statistics
    this.adminService.getAllAdmins().subscribe({
      next: (admins) => {
        this.ngZone.run(() => {
          this.totalSkOfficials = admins ? admins.length : 0;
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error loading admins:', err);
        this.ngZone.run(() => {
          this.totalSkOfficials = 0;
          this.cdr.detectChanges();
        });
      }
    });

    // Load youth member statistics
    this.youthProfileService.getAllYouthProfiles().subscribe({
      next: (profiles) => {
        this.ngZone.run(() => {
          this.totalYouthMembers = profiles ? profiles.length : 0;
          this.activeYouthMembers = profiles ? profiles.length : 0;
          this.isLoading = false;
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error loading youth profiles:', err);
        this.ngZone.run(() => {
          this.totalYouthMembers = 0;
          this.activeYouthMembers = 0;
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([`/administrator/${route}`]);
  }

  logout(): void {
    localStorage.removeItem('administrator');
    this.router.navigate(['/administrator/login']);
  }
}
