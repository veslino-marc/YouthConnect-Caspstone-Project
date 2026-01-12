package com.youthconnect.youthconnect_id.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_youth_classification")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class YouthClassification {
    
    @Id
    @Column(name = "youth_id")
    private Integer youthId;
    
    @Column(name = "youth_classification", nullable = false)
    private String youthClassification;
    
    @Column(name = "education_background", nullable = false)
    private String educationBackground;
    
    @Column(name = "work_status", nullable = false)
    private String workStatus;
    
    @Column(name = "sk_voter", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean skVoter = false;
    
    @Column(name = "national_voter", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean nationalVoter = false;
    
    @Column(name = "past_voter", nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean pastVoter = false;
    
    @Column(name = "num_attended_assemblies", nullable = false)
    private Integer numAttendedAssemblies = 0;
    
    @Column(name = "non_attendance_reason")
    private String nonAttendanceReason;
}
