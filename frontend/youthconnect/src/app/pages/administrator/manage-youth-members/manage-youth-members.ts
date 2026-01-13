import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { YouthProfileService } from '../../../services/youth-profile.service';

@Component({
  selector: 'app-manage-youth-members',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './manage-youth-members.html',
  styleUrls: ['./manage-youth-members.scss']
})
export class ManageYouthMembersPage implements OnInit {
  youthMembers: any[] = [];
  filteredYouthMembers: any[] = [];
  searchTerm: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private youthService: YouthProfileService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadYouthMembers();
  }

  loadYouthMembers() {
    this.isLoading = true;
    this.youthService.getAllYouthProfiles().subscribe({
      next: (data) => {
        this.ngZone.run(() => {
          this.youthMembers = data || [];
          this.filteredYouthMembers = data || [];
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.errorMessage = 'Failed to load Youth Members';
          this.isLoading = false;
          this.cdr.detectChanges();
        });
        console.error('Error loading Youth Members:', err);
      }
    });
  }

  searchYouthMembers() {
    if (!this.searchTerm.trim()) {
      this.filteredYouthMembers = this.youthMembers;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredYouthMembers = this.youthMembers.filter(youth =>
      youth.firstName?.toLowerCase().includes(term) ||
      youth.lastName?.toLowerCase().includes(term) ||
      youth.email?.toLowerCase().includes(term)
    );
  }

  viewDetails(youthId: number) {
    this.router.navigate(['/administrator/youth-member-details', youthId]);
  }

  deleteYouthMember(youthId: number) {
    if (confirm('Are you sure you want to delete this youth member?')) {
      this.youthService.deleteYouthProfile(youthId).subscribe({
        next: () => {
          this.successMessage = 'Youth member deleted successfully';
          this.loadYouthMembers();
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete youth member';
          console.error('Error deleting youth member:', err);
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/administrator/dashboard']);
  }
}
