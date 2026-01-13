package com.youthconnect.youthconnect_id.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Integer taskId;

    @Column(name = "admin_id", nullable = false)
    private Integer adminId;

    @Column(name = "assigned_to_admin_id", nullable = false)
    private Integer assignedToAdminId;

    @Column(name = "task_title", length = 200, nullable = false)
    private String taskTitle;

    @Column(name = "task_description", columnDefinition = "TEXT")
    private String taskDescription;

    @Column(name = "task_priority", nullable = false, columnDefinition = "ENUM('Low','Medium','High')")
    private String taskPriority = "Medium";

    @Column(name = "status", nullable = false, columnDefinition = "ENUM('Pending','In Progress','Completed','Cancelled')")
    @Convert(converter = TaskStatusConverter.class)
    private TaskStatus status = TaskStatus.PENDING;

    @Column(name = "due_date")
    private LocalDateTime dueDate;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (status == null) {
            status = TaskStatus.PENDING;
        }
        if (taskPriority == null || taskPriority.isEmpty()) {
            taskPriority = "Medium";
        }
    }

    // Getters and Setters
    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public Integer getAssignedToAdminId() {
        return assignedToAdminId;
    }

    public void setAssignedToAdminId(Integer assignedToAdminId) {
        this.assignedToAdminId = assignedToAdminId;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public String getTaskPriority() {
        return taskPriority;
    }

    public void setTaskPriority(String taskPriority) {
        this.taskPriority = taskPriority;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
