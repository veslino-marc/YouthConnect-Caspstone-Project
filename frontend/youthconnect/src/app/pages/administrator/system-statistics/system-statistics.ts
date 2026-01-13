import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { YouthProfileService } from '../../../services/youth-profile.service';
import { EventService } from '../../../services/event.service';
import { ConcernService } from '../../../services/concern.service';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-system-statistics',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './system-statistics.html',
  styleUrls: ['./system-statistics.scss']
})
export class SystemStatisticsPage implements OnInit {
  statistics: any = {
    totalSkOfficials: 0,
    activeSkOfficials: 0,
    totalYouthMembers: 0,
    activeYouthMembers: 0,
    totalEvents: 0,
    totalConcerns: 0,
    openConcerns: 0,
    resolvedConcerns: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  };

  constructor(
    private adminService: AdminService,
    private youthService: YouthProfileService,
    private eventService: EventService,
    private concernService: ConcernService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    // Load SK Officials
    this.adminService.getAllAdmins().subscribe({
      next: (admins) => {
        this.statistics.totalSkOfficials = admins.length;
        this.statistics.activeSkOfficials = admins.filter((a: any) => a.isActive).length;
      },
      error: (err) => console.error('Error loading SK Officials:', err)
    });

    // Load Youth Members
    this.youthService.getAllYouthProfiles().subscribe({
      next: (youth) => {
        this.statistics.totalYouthMembers = youth.length;
        this.statistics.activeYouthMembers = youth.filter((y: any) => y.isActive).length;
      },
      error: (err) => console.error('Error loading Youth Members:', err)
    });

    // Load Events
    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        this.statistics.totalEvents = events.length;
      },
      error: (err) => console.error('Error loading Events:', err)
    });

    // Load Concerns
    this.concernService.getAllConcerns().subscribe({
      next: (concerns) => {
        this.statistics.totalConcerns = concerns.length;
        this.statistics.openConcerns = concerns.filter((c: any) => c.status === 'Open').length;
        this.statistics.resolvedConcerns = concerns.filter((c: any) => c.status === 'Resolved').length;
      },
      error: (err) => console.error('Error loading Concerns:', err)
    });

    // Load Tasks
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.statistics.totalTasks = tasks.length;
        this.statistics.completedTasks = tasks.filter((t: any) => t.status === 'Completed').length;
        this.statistics.pendingTasks = tasks.filter((t: any) => t.status === 'Pending').length;
      },
      error: (err) => console.error('Error loading Tasks:', err)
    });
  }

  goBack() {
    this.router.navigate(['/administrator/dashboard']);
  }
}
