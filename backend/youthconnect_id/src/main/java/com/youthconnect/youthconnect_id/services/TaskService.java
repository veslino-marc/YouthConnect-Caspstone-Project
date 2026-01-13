package com.youthconnect.youthconnect_id.services;

import com.youthconnect.youthconnect_id.models.Task;
import com.youthconnect.youthconnect_id.models.dto.TaskDTO;
import java.util.List;

public interface TaskService {
    TaskDTO createTask(TaskDTO taskDTO);
    TaskDTO updateTask(Integer taskId, TaskDTO taskDTO);
    void deleteTask(Integer taskId);
    TaskDTO getTaskById(Integer taskId);
    List<TaskDTO> getAllTasks();
    List<TaskDTO> getTasksByAdminId(Integer adminId);
    List<TaskDTO> getTasksByStatus(String status);
    List<TaskDTO> getTasksByAdminIdAndStatus(Integer adminId, String status);
}
