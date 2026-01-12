package com.youthconnect.youthconnect_id.models.dto;

public class LoginResponseDTO {
    private Integer userId;
    private String email;
    private Integer youthId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String role;

    public LoginResponseDTO() {}

    public LoginResponseDTO(Integer userId, String email, Integer youthId, String firstName, String middleName, String lastName, String role) {
        this.userId = userId;
        this.email = email;
        this.youthId = youthId;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.role = role;
    }

    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Integer getYouthId() { return youthId; }
    public void setYouthId(Integer youthId) { this.youthId = youthId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getMiddleName() { return middleName; }
    public void setMiddleName(String middleName) { this.middleName = middleName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
