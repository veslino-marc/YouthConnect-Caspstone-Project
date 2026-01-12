package com.youthconnect.youthconnect_id.repositories;

import com.youthconnect.youthconnect_id.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findByCreatedByAdminId(Integer adminId);
    List<Event> findByEventDateBetween(LocalDateTime start, LocalDateTime end);
}
