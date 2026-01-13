package com.youthconnect.youthconnect_id.controllers;

import com.youthconnect.youthconnect_id.models.dto.TaskDTO;
import com.youthconnect.youthconnect_id.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody TaskDTO taskDTO) {
        try {
            TaskDTO createdTask = taskService.createTask(taskDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error creating task: " + e.getMessage());
        }
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable Integer taskId, @RequestBody TaskDTO taskDTO) {
        try {
            TaskDTO updatedTask = taskService.updateTask(taskId, taskDTO);
            return ResponseEntity.ok(updatedTask);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error updating task: " + e.getMessage());
        }
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Integer taskId) {
        try {
            taskService.deleteTask(taskId);
            return ResponseEntity.ok("Task deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error deleting task: " + e.getMessage());
        }
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<?> getTaskById(@PathVariable Integer taskId) {
        try {
            TaskDTO task = taskService.getTaskById(taskId);
            return ResponseEntity.ok(task);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Task not found: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllTasks() {
        try {
            List<TaskDTO> tasks = taskService.getAllTasks();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error fetching tasks: " + e.getMessage());
        }
    }

    @GetMapping("/admin/{adminId}")
    public ResponseEntity<?> getTasksByAdminId(@PathVariable Integer adminId) {
        try {
            List<TaskDTO> tasks = taskService.getTasksByAdminId(adminId);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error fetching tasks: " + e.getMessage());
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getTasksByStatus(@PathVariable String status) {
        try {
            List<TaskDTO> tasks = taskService.getTasksByStatus(status);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error fetching tasks: " + e.getMessage());
        }
    }

    @GetMapping("/admin/{adminId}/status/{status}")
    public ResponseEntity<?> getTasksByAdminIdAndStatus(@PathVariable Integer adminId, @PathVariable String status) {
        try {
            List<TaskDTO> tasks = taskService.getTasksByAdminIdAndStatus(adminId, status);
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error fetching tasks: " + e.getMessage());
        }
    }
}
