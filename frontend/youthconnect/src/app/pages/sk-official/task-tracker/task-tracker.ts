import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-task-tracker',
  standalone: true,
  imports: [SkSidebar, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-tracker.html',
  styleUrl: './task-tracker.scss',
})
export class TaskTracker implements OnInit {
  taskForm: FormGroup;
  submitted = false;
  loading = false;
  successMessage = '';
  errorMessage = '';
  currentAdminId: number | null = null;
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  showForm = false;
  tasksLoading = false;
  editingTaskId: number | null = null;

  // Filter and sort state
  statusFilter: string = '';
  priorityFilter: string = '';
  searchTerm: string = '';
  sortColumn: 'title' | 'priority' | 'dueDate' = 'dueDate';
  sortDirection: 'asc' | 'desc' = 'asc';

  statusOptions = [
    { value: 'Pending', label: '⏳ Pending' },
    { value: 'In Progress', label: '🔄 In Progress' },
    { value: 'Completed', label: '✓ Completed' },
    { value: 'Cancelled', label: '❌ Cancelled' }
  ];

  priorityOptions = [
    { value: 'Low', label: '📌 Low' },
    { value: 'Medium', label: '🔶 Medium' },
    { value: 'High', label: '🔴 High' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {
    this.taskForm = this.formBuilder.group({
      taskTitle: ['', Validators.required],
      taskDescription: [''],
      taskPriority: ['Medium', Validators.required],
      dueDate: ['', Validators.required]
    });

    // Get the current logged-in admin ID from localStorage
    const adminData = localStorage.getItem('admin');
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        this.currentAdminId = admin.adminId;
      } catch (e) {
        console.error('Error parsing admin data from localStorage:', e);
      }
    }
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    if (!this.currentAdminId) {
      this.errorMessage = 'Admin ID not found. Please log in again.';
      return;
    }

    this.tasksLoading = true;
    this.taskService.getTasksByAdminId(this.currentAdminId).subscribe(
      (response) => {
        this.tasks = response;
        this.applyFiltersAndSort();
        this.tasksLoading = false;
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error loading tasks:', error);
        this.errorMessage = 'Failed to load tasks';
        this.tasksLoading = false;
        this.cdr.markForCheck();
      }
    );
  }

  onFilterChange() {
    this.applyFiltersAndSort();
  }

  onSearchChange() {
    this.applyFiltersAndSort();
  }

  onSort(column: 'title' | 'priority' | 'dueDate') {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort() {
    let filtered = [...this.tasks];

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.taskTitle?.toLowerCase().includes(term) ||
          (task.taskDescription && task.taskDescription.toLowerCase().includes(term))
      );
    }

    // Apply status filter
    if (this.statusFilter) {
      filtered = filtered.filter((task) => task.status === this.statusFilter);
    }

    // Apply priority filter
    if (this.priorityFilter) {
      filtered = filtered.filter((task) => task.taskPriority === this.priorityFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (this.sortColumn === 'title') {
        aValue = (a.taskTitle || '').toLowerCase();
        bValue = (b.taskTitle || '').toLowerCase();
      } else if (this.sortColumn === 'priority') {
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        aValue = priorityOrder[a.taskPriority as keyof typeof priorityOrder] || 0;
        bValue = priorityOrder[b.taskPriority as keyof typeof priorityOrder] || 0;
      } else if (this.sortColumn === 'dueDate') {
        aValue = a.dueDate ? new Date(a.dueDate).getTime() : 0;
        bValue = b.dueDate ? new Date(b.dueDate).getTime() : 0;
      }

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.filteredTasks = filtered;
    this.cdr.markForCheck();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  onSubmit() {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.taskForm.invalid) {
      return;
    }

    if (!this.currentAdminId) {
      this.errorMessage = 'Admin ID not found. Please log in again.';
      return;
    }

    this.loading = true;
    const formData = this.taskForm.value;

    const taskData: Task = {
      adminId: this.currentAdminId,
      assignedToAdminId: this.currentAdminId,
      taskTitle: formData.taskTitle,
      taskDescription: formData.taskDescription,
      taskPriority: formData.taskPriority as 'Low' | 'Medium' | 'High',
      status: 'Pending' as 'Pending' | 'In Progress' | 'Completed' | 'Cancelled',
      dueDate: formData.dueDate
    };

    if (this.editingTaskId) {
      // Update existing task
      this.taskService.updateTask(this.editingTaskId, taskData).subscribe(
        (response) => {
          this.loading = false;
          this.successMessage = 'Task updated successfully!';
          this.taskForm.reset();
          this.submitted = false;
          this.editingTaskId = null;
          this.showForm = false;
          this.loadTasks();
          this.cdr.markForCheck();

          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        (error) => {
          console.error('Error updating task:', error);
          this.loading = false;
          this.errorMessage = error.error?.message || 'Failed to update task. Please try again.';
          this.cdr.markForCheck();

          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      );
    } else {
      // Create new task
      this.taskService.createTask(taskData).subscribe(
        (response) => {
          this.loading = false;
          this.successMessage = 'Task created successfully!';
          this.taskForm.reset();
          this.submitted = false;
          this.showForm = false;
          this.loadTasks();
          this.cdr.markForCheck();

          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        (error) => {
          console.error('Error creating task:', error);
          this.loading = false;
          this.errorMessage = error.error?.message || 'Failed to create task. Please try again.';
          this.cdr.markForCheck();

          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      );
    }
  }

  resetForm() {
    this.taskForm.reset();
    this.submitted = false;
    this.editingTaskId = null;
    this.cdr.markForCheck();
  }

  onEdit(task: Task) {
    this.editingTaskId = task.taskId || null;
    this.taskForm.patchValue({
      taskTitle: task.taskTitle || '',
      taskDescription: task.taskDescription || '',
      taskPriority: task.taskPriority || 'Medium',
      dueDate: task.dueDate ? this.formatDateTimeLocal(task.dueDate) : ''
    });
    this.showForm = true;
    this.submitted = false;
    this.cdr.markForCheck();
  }

  onDelete(task: Task) {
    if (!confirm(`Are you sure you want to delete "${task.taskTitle}"?`)) return;

    this.taskService.deleteTask(task.taskId!).subscribe(
      (response) => {
        this.tasks = this.tasks.filter((t) => t.taskId !== task.taskId);
        this.applyFiltersAndSort();
        this.successMessage = 'Task deleted successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error deleting task:', error);
        this.errorMessage = 'Failed to delete task. Please try again.';
        this.cdr.markForCheck();
      }
    );
  }

  onStatusChange(task: Task, status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled') {
    const updatedTask = { ...task, status };
    this.taskService.updateTask(task.taskId!, updatedTask).subscribe(
      () => {
        task.status = status;
        this.applyFiltersAndSort();
        this.successMessage = `Task marked as ${status}`;
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.cdr.markForCheck();
      },
      (error) => {
        console.error('Error updating task status:', error);
        this.errorMessage = `Error updating task status: ${error.message}`;
        this.cdr.markForCheck();
      }
    );
  }

  formatDateTimeLocal(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  }

  getStatusDisplay(status: string | undefined): string {
    const option = this.statusOptions.find((o) => o.value === status);
    return option ? option.label : 'Unknown';
  }

  getPriorityDisplay(priority: string | undefined): string {
    const option = this.priorityOptions.find((o) => o.value === priority);
    return option ? option.label : 'Unknown';
  }

  get dueDate() {
    return this.taskForm.get('dueDate');
  }
}
