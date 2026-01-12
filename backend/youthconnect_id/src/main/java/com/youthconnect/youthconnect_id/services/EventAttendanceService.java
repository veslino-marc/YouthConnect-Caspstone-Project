package com.youthconnect.youthconnect_id.services;

import com.youthconnect.youthconnect_id.models.EventAttendance;
import com.youthconnect.youthconnect_id.repositories.EventAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventAttendanceService {
    
    @Autowired
    private EventAttendanceRepository eventAttendanceRepository;

    public EventAttendance registerForEvent(EventAttendance attendance) {
        // Check if user is already registered for this event
        if (eventAttendanceRepository.existsByEventIdAndUserId(attendance.getEventId(), attendance.getUserId())) {
            throw new RuntimeException("User is already registered for this event");
        }
        return eventAttendanceRepository.save(attendance);
    }

    public Optional<EventAttendance> getAttendance(Integer attendanceId) {
        return eventAttendanceRepository.findById(attendanceId);
    }

    public List<EventAttendance> getEventAttendees(Integer eventId) {
        return eventAttendanceRepository.findByEventId(eventId);
    }

    public List<EventAttendance> getUserEvents(Integer userId) {
        return eventAttendanceRepository.findByUserId(userId);
    }

    public boolean isUserRegistered(Integer eventId, Integer userId) {
        return eventAttendanceRepository.existsByEventIdAndUserId(eventId, userId);
    }

    public Optional<EventAttendance> getAttendanceByEventAndUser(Integer eventId, Integer userId) {
        return eventAttendanceRepository.findByEventIdAndUserId(eventId, userId);
    }

    public EventAttendance markAsAttended(Integer attendanceId) {
        Optional<EventAttendance> attendance = eventAttendanceRepository.findById(attendanceId);
        if (attendance.isPresent()) {
            EventAttendance ea = attendance.get();
            ea.setIsAttended(true);
            ea.setAttendedAt(java.time.LocalDateTime.now());
            return eventAttendanceRepository.save(ea);
        }
        throw new RuntimeException("Attendance record not found");
    }

    public void deleteAttendance(Integer attendanceId) {
        eventAttendanceRepository.deleteById(attendanceId);
    }
}
