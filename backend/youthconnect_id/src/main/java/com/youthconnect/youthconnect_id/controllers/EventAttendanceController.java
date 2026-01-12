package com.youthconnect.youthconnect_id.controllers;

import com.youthconnect.youthconnect_id.models.EventAttendance;
import com.youthconnect.youthconnect_id.services.EventAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/event-attendance")
@CrossOrigin(origins = "http://localhost:4200")
public class EventAttendanceController {

    @Autowired
    private EventAttendanceService eventAttendanceService;

    @PostMapping("/register")
    public ResponseEntity<?> registerForEvent(@RequestBody EventAttendance attendance) {
        try {
            EventAttendance registered = eventAttendanceService.registerForEvent(attendance);
            return ResponseEntity.status(HttpStatus.CREATED).body(registered);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error registering for event: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/{attendanceId}")
    public ResponseEntity<EventAttendance> getAttendance(@PathVariable Integer attendanceId) {
        Optional<EventAttendance> attendance = eventAttendanceService.getAttendance(attendanceId);
        return attendance.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<EventAttendance>> getEventAttendees(@PathVariable Integer eventId) {
        List<EventAttendance> attendees = eventAttendanceService.getEventAttendees(eventId);
        return ResponseEntity.ok(attendees);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventAttendance>> getUserEvents(@PathVariable Integer userId) {
        List<EventAttendance> events = eventAttendanceService.getUserEvents(userId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/check/{eventId}/{userId}")
    public ResponseEntity<Boolean> checkRegistration(@PathVariable Integer eventId, @PathVariable Integer userId) {
        boolean isRegistered = eventAttendanceService.isUserRegistered(eventId, userId);
        return ResponseEntity.ok(isRegistered);
    }

    @PutMapping("/{attendanceId}/mark-attended")
    public ResponseEntity<EventAttendance> markAsAttended(@PathVariable Integer attendanceId) {
        try {
            EventAttendance attendance = eventAttendanceService.markAsAttended(attendanceId);
            return ResponseEntity.ok(attendance);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{attendanceId}")
    public ResponseEntity<Void> deleteAttendance(@PathVariable Integer attendanceId) {
        eventAttendanceService.deleteAttendance(attendanceId);
        return ResponseEntity.noContent().build();
    }
}
