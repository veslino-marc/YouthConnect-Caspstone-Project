import { Component } from '@angular/core';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';

@Component({
  selector: 'app-task-tracker',
  standalone: true,
  imports: [SkSidebar],
  templateUrl: './task-tracker.html',
  styleUrl: './task-tracker.scss',
})
export class TaskTracker {

}
