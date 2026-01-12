package com.youthconnect.youthconnect_id.repositories;

import com.youthconnect.youthconnect_id.models.EventAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventAttendanceRepository extends JpaRepository<EventAttendance, Integer> {
    List<EventAttendance> findByEventId(Integer eventId);
    
    Optional<EventAttendance> findByEventIdAndUserId(Integer eventId, Integer userId);
    
    List<EventAttendance> findByUserId(Integer userId);
    
    boolean existsByEventIdAndUserId(Integer eventId, Integer userId);
}
