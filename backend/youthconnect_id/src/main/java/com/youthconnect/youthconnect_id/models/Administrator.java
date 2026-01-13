package com.youthconnect.youthconnect_id.models;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_administrator")
public class Administrator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "administrator_id")
    private Integer administratorId;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "created_at")
    private java.sql.Timestamp createdAt;

    public Integer getAdministratorId() {
        return administratorId;
    }
    public void setAdministratorId(Integer administratorId) {
        this.administratorId = administratorId;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPasswordHash() {
        return passwordHash;
    }
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    public Boolean getIsActive() {
        return isActive;
    }
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    public java.sql.Timestamp getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(java.sql.Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
