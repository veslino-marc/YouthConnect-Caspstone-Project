package com.youthconnect.youthconnect_id.models.dto;

import java.time.LocalDateTime;

public class EventDTO {
    private String title;
    private String description;
    private LocalDateTime eventDate;
    private String location;
    private String status;
    private Integer createdByAdminId;

    // Constructors
    public EventDTO() {
    }

    public EventDTO(String title, String description, LocalDateTime eventDate, String location, String status, Integer createdByAdminId) {
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.location = location;
        this.status = status;
        this.createdByAdminId = createdByAdminId;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getEventDate() {
        return eventDate;
    }

    public void setEventDate(LocalDateTime eventDate) {
        this.eventDate = eventDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getCreatedByAdminId() {
        return createdByAdminId;
    }

    public void setCreatedByAdminId(Integer createdByAdminId) {
        this.createdByAdminId = createdByAdminId;
    }
}
