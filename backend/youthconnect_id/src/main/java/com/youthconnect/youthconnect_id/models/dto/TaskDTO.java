package com.youthconnect.youthconnect_id.models.dto;

import com.youthconnect.youthconnect_id.models.TaskStatus;
import java.time.LocalDateTime;

public class TaskDTO {
    private Integer taskId;
    private Integer adminId;
    private Integer assignedToAdminId;
    private String taskTitle;
    private String taskDescription;
    private String taskPriority;
    private TaskStatus status;
    private LocalDateTime dueDate;
    private LocalDateTime createdAt;

    // Constructors
    public TaskDTO() {}

    public TaskDTO(Integer taskId, Integer adminId, Integer assignedToAdminId, 
                   String taskTitle, String taskDescription, String taskPriority,
                   TaskStatus status, LocalDateTime dueDate, LocalDateTime createdAt) {
        this.taskId = taskId;
        this.adminId = adminId;
        this.assignedToAdminId = assignedToAdminId;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.taskPriority = taskPriority;
        this.status = status;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
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
