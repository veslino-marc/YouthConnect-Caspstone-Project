package com.youthconnect.youthconnect_id.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_youth_profile")
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
    
    public YouthProfile() {
    }
    
    public YouthProfile(Integer youthId, String firstName, String middleName, String lastName, String suffix, String gender, LocalDate birthday, String contactNumber, String completeAddress, String civilStatus, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.youthId = youthId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.suffix = suffix;
        this.gender = gender;
        this.birthday = birthday;
        this.contactNumber = contactNumber;
        this.completeAddress = completeAddress;
        this.civilStatus = civilStatus;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    public Integer getYouthId() {
        return youthId;
    }
    
    public void setYouthId(Integer youthId) {
        this.youthId = youthId;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getMiddleName() {
        return middleName;
    }
    
    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    
    public String getSuffix() {
        return suffix;
    }
    
    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }
    
    public String getGender() {
        return gender;
    }
    
    public void setGender(String gender) {
        this.gender = gender;
    }
    
    public LocalDate getBirthday() {
        return birthday;
    }
    
    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }
    
    public String getContactNumber() {
        return contactNumber;
    }
    
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }
    
    public String getCompleteAddress() {
        return completeAddress;
    }
    
    public void setCompleteAddress(String completeAddress) {
        this.completeAddress = completeAddress;
    }
    
    public String getCivilStatus() {
        return civilStatus;
    }
    
    public void setCivilStatus(String civilStatus) {
        this.civilStatus = civilStatus;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
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
