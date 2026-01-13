package com.youthconnect.youthconnect_id.repositories;

import com.youthconnect.youthconnect_id.models.Task;
import com.youthconnect.youthconnect_id.models.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByAssignedToAdminId(Integer assignedToAdminId);
    List<Task> findByStatus(TaskStatus status);
    List<Task> findByAssignedToAdminIdAndStatus(Integer assignedToAdminId, TaskStatus status);
}
