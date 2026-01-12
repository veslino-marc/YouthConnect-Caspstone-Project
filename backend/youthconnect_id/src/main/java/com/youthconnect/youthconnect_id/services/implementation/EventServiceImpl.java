package com.youthconnect.youthconnect_id.services.implementation;

import com.youthconnect.youthconnect_id.models.Event;
import com.youthconnect.youthconnect_id.models.dto.EventDTO;
import com.youthconnect.youthconnect_id.repositories.EventRepository;
import com.youthconnect.youthconnect_id.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Override
    public Event createEvent(EventDTO eventDTO) {
        Event event = new Event();
        event.setTitle(eventDTO.getTitle());
        event.setDescription(eventDTO.getDescription());
        event.setEventDate(eventDTO.getEventDate());
        event.setLocation(eventDTO.getLocation());
        event.setCreatedByAdminId(eventDTO.getCreatedByAdminId());
        return eventRepository.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Optional<Event> getEventById(Integer id) {
        return eventRepository.findById(id);
    }

    @Override
    public List<Event> getEventsByAdminId(Integer adminId) {
        return eventRepository.findByCreatedByAdminId(adminId);
    }

    @Override
    public List<Event> getEventsByDateRange(LocalDateTime start, LocalDateTime end) {
        return eventRepository.findByEventDateBetween(start, end);
    }

    @Override
    public Event updateEvent(Integer id, EventDTO eventDTO) {
        Optional<Event> existingEvent = eventRepository.findById(id);
        if (existingEvent.isPresent()) {
            Event event = existingEvent.get();
            event.setTitle(eventDTO.getTitle());
            event.setDescription(eventDTO.getDescription());
            event.setEventDate(eventDTO.getEventDate());
            event.setLocation(eventDTO.getLocation());
            if (eventDTO.getStatus() != null) {
                event.setStatus(eventDTO.getStatus());
            }
            return eventRepository.save(event);
        }
        return null;
    }

    @Override
    public void deleteEvent(Integer id) {
        eventRepository.deleteById(id);
    }
}
