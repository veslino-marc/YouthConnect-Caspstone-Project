export interface Task {
  taskId?: number;
  adminId?: number;
  assignedToAdminId?: number;
  taskTitle?: string;
  taskDescription?: string;
  taskPriority?: 'Low' | 'Medium' | 'High';
  status?: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  dueDate?: Date;
  createdAt?: Date;
}
