package com.youthconnect.youthconnect_id.services.implementation;

import com.youthconnect.youthconnect_id.models.Task;
import com.youthconnect.youthconnect_id.models.TaskStatus;
import com.youthconnect.youthconnect_id.models.dto.TaskDTO;
import com.youthconnect.youthconnect_id.repositories.TaskRepository;
import com.youthconnect.youthconnect_id.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = new Task();
        task.setAdminId(taskDTO.getAdminId());
        task.setAssignedToAdminId(taskDTO.getAssignedToAdminId());
        task.setTaskTitle(taskDTO.getTaskTitle());
        task.setTaskDescription(taskDTO.getTaskDescription());
        task.setTaskPriority(taskDTO.getTaskPriority() != null ? taskDTO.getTaskPriority() : "Medium");
        task.setStatus(taskDTO.getStatus() != null ? taskDTO.getStatus() : TaskStatus.PENDING);
        task.setDueDate(taskDTO.getDueDate());

        Task savedTask = taskRepository.save(task);
        return convertToDTO(savedTask);
    }

    @Override
    public TaskDTO updateTask(Integer taskId, TaskDTO taskDTO) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (taskDTO.getTaskTitle() != null) {
            task.setTaskTitle(taskDTO.getTaskTitle());
        }
        if (taskDTO.getTaskDescription() != null) {
            task.setTaskDescription(taskDTO.getTaskDescription());
        }
        if (taskDTO.getTaskPriority() != null) {
            task.setTaskPriority(taskDTO.getTaskPriority());
        }
        if (taskDTO.getStatus() != null) {
            task.setStatus(taskDTO.getStatus());
        }
        if (taskDTO.getDueDate() != null) {
            task.setDueDate(taskDTO.getDueDate());
        }

        Task updatedTask = taskRepository.save(task);
        return convertToDTO(updatedTask);
    }

    @Override
    public void deleteTask(Integer taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        taskRepository.delete(task);
    }

    @Override
    public TaskDTO getTaskById(Integer taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return convertToDTO(task);
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> getTasksByAdminId(Integer adminId) {
        return taskRepository.findByAssignedToAdminId(adminId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> getTasksByStatus(String status) {
        TaskStatus taskStatus = TaskStatus.fromDisplayValue(status);
        return taskRepository.findByStatus(taskStatus).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> getTasksByAdminIdAndStatus(Integer adminId, String status) {
        TaskStatus taskStatus = TaskStatus.fromDisplayValue(status);
        return taskRepository.findByAssignedToAdminIdAndStatus(adminId, taskStatus).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TaskDTO convertToDTO(Task task) {
        return new TaskDTO(
                task.getTaskId(),
                task.getAdminId(),
                task.getAssignedToAdminId(),
                task.getTaskTitle(),
                task.getTaskDescription(),
                task.getTaskPriority(),
                task.getStatus(),
                task.getDueDate(),
                task.getCreatedAt()
        );
    }
}
