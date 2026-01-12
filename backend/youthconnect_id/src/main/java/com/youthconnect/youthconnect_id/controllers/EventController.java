package com.youthconnect.youthconnect_id.controllers;

import com.youthconnect.youthconnect_id.models.Event;
import com.youthconnect.youthconnect_id.models.dto.EventDTO;
import com.youthconnect.youthconnect_id.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @PostMapping
    public ResponseEntity<Event> createEvent(@RequestBody EventDTO eventDTO) {
        try {
            System.out.println("=== Received Event DTO ===");
            System.out.println("Title: " + eventDTO.getTitle());
            System.out.println("Description: " + eventDTO.getDescription());
            System.out.println("Event Date: " + eventDTO.getEventDate());
            System.out.println("Location: " + eventDTO.getLocation());
            
            Event event = eventService.createEvent(eventDTO);
            
            System.out.println("=== Event Created Successfully ===");
            System.out.println("Event ID: " + event.getEventId());
            
            return new ResponseEntity<>(event, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("=== ERROR CREATING EVENT ===");
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        try {
            List<Event> events = eventService.getAllEvents();
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("=== ERROR FETCHING EVENTS ===");
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Integer id) {
        try {
            Optional<Event> event = eventService.getEventById(id);
            return event.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            System.err.println("=== ERROR FETCHING EVENT ===");
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/{adminId}")
    public ResponseEntity<List<Event>> getEventsByAdminId(@PathVariable Integer adminId) {
        try {
            List<Event> events = eventService.getEventsByAdminId(adminId);
            return new ResponseEntity<>(events, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("=== ERROR FETCHING EVENTS BY ADMIN ===");
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Integer id, @RequestBody EventDTO eventDTO) {
        try {
            System.out.println("=== Updating Event ===");
            System.out.println("Event ID: " + id);
            
            Event event = eventService.updateEvent(id, eventDTO);
            if (event != null) {
                System.out.println("=== Event Updated Successfully ===");
                return new ResponseEntity<>(event, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            System.err.println("=== ERROR UPDATING EVENT ===");
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer id) {
        try {
            System.out.println("=== Deleting Event ===");
            System.out.println("Event ID: " + id);
            
            eventService.deleteEvent(id);
            
            System.out.println("=== Event Deleted Successfully ===");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            System.err.println("=== ERROR DELETING EVENT ===");
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
