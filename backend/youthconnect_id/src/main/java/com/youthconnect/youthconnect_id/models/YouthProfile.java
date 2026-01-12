package com.youthconnect.youthconnect_id.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_youth_profile")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class YouthProfile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "youth_id")
    private Integer youthId;
    
    @Column(name = "first_name", nullable = false)
    private String firstName;
    
    @Column(name = "middle_name")
    private String middleName;
    
    @Column(name = "last_name", nullable = false)
    private String lastName;
    
    @Column(name = "suffix")
    private String suffix;
    
    @Column(name = "gender", nullable = false)
    private String gender;
    
    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;
    
    @Column(name = "contact_number", nullable = false)
    private String contactNumber;
    
    @Column(name = "complete_address", nullable = false)
    private String completeAddress;
    
    @Column(name = "civil_status", nullable = false)
    private String civilStatus;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
