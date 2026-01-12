package com.youthconnect.youthconnect_id.services;

import com.youthconnect.youthconnect_id.models.Event;
import com.youthconnect.youthconnect_id.models.dto.EventDTO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventService {
    Event createEvent(EventDTO eventDTO);

    List<Event> getAllEvents();

    Optional<Event> getEventById(Integer id);

    List<Event> getEventsByAdminId(Integer adminId);

    List<Event> getEventsByDateRange(LocalDateTime start, LocalDateTime end);

    Event updateEvent(Integer id, EventDTO eventDTO);

    void deleteEvent(Integer id);
}
