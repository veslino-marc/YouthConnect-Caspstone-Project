package com.youthconnect.youthconnect_id.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tbl_youth_classification")
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
    
    public YouthClassification() {
    }
    
    public YouthClassification(Integer youthId, String youthClassification, String educationBackground, String workStatus, Boolean skVoter, Boolean nationalVoter, Boolean pastVoter, Integer numAttendedAssemblies, String nonAttendanceReason) {
        this.youthId = youthId;
        this.youthClassification = youthClassification;
        this.educationBackground = educationBackground;
        this.workStatus = workStatus;
        this.skVoter = skVoter;
        this.nationalVoter = nationalVoter;
        this.pastVoter = pastVoter;
        this.numAttendedAssemblies = numAttendedAssemblies;
        this.nonAttendanceReason = nonAttendanceReason;
    }
    
    public Integer getYouthId() {
        return youthId;
    }
    
    public void setYouthId(Integer youthId) {
        this.youthId = youthId;
    }
    
    public String getYouthClassification() {
        return youthClassification;
    }
    
    public void setYouthClassification(String youthClassification) {
        this.youthClassification = youthClassification;
    }
    
    public String getEducationBackground() {
        return educationBackground;
    }
    
    public void setEducationBackground(String educationBackground) {
        this.educationBackground = educationBackground;
    }
    
    public String getWorkStatus() {
        return workStatus;
    }
    
    public void setWorkStatus(String workStatus) {
        this.workStatus = workStatus;
    }
    
    public Boolean getSkVoter() {
        return skVoter;
    }
    
    public void setSkVoter(Boolean skVoter) {
        this.skVoter = skVoter;
    }
    
    public Boolean getNationalVoter() {
        return nationalVoter;
    }
    
    public void setNationalVoter(Boolean nationalVoter) {
        this.nationalVoter = nationalVoter;
    }
    
    public Boolean getPastVoter() {
        return pastVoter;
    }
    
    public void setPastVoter(Boolean pastVoter) {
        this.pastVoter = pastVoter;
    }
    
    public Integer getNumAttendedAssemblies() {
        return numAttendedAssemblies;
    }
    
    public void setNumAttendedAssemblies(Integer numAttendedAssemblies) {
        this.numAttendedAssemblies = numAttendedAssemblies;
    }
    
    public String getNonAttendanceReason() {
        return nonAttendanceReason;
    }
    
    public void setNonAttendanceReason(String nonAttendanceReason) {
        this.nonAttendanceReason = nonAttendanceReason;
    }
}
