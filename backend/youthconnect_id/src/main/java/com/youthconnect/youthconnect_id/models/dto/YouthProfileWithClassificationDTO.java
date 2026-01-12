package com.youthconnect.youthconnect_id.models.dto;

public class YouthProfileWithClassificationDTO {
    private Integer youthId;
    private String firstName;
    private String middleName;
    private String lastName;
    private String suffix;
    private String gender;
    private String birthday;
    private String contactNumber;
    private String completeAddress;
    private String civilStatus;
    private String createdAt;
    private String updatedAt;
    
    // Classification fields
    private String youthClassification;
    private String educationBackground;
    private String workStatus;
    private Boolean skVoter;
    private Boolean nationalVoter;
    private Boolean pastVoter;
    private Integer numAttendedAssemblies;
    private String nonAttendanceReason;

    // Constructors
    public YouthProfileWithClassificationDTO() {}

    public YouthProfileWithClassificationDTO(Integer youthId, String firstName, String middleName, String lastName, 
            String suffix, String gender, String birthday, String contactNumber, String completeAddress, 
            String civilStatus, String createdAt, String updatedAt, String youthClassification, 
            String educationBackground, String workStatus, Boolean skVoter, Boolean nationalVoter, 
            Boolean pastVoter, Integer numAttendedAssemblies, String nonAttendanceReason) {
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
        this.youthClassification = youthClassification;
        this.educationBackground = educationBackground;
        this.workStatus = workStatus;
        this.skVoter = skVoter;
        this.nationalVoter = nationalVoter;
        this.pastVoter = pastVoter;
        this.numAttendedAssemblies = numAttendedAssemblies;
        this.nonAttendanceReason = nonAttendanceReason;
    }

    // Getters and Setters
    public Integer getYouthId() { return youthId; }
    public void setYouthId(Integer youthId) { this.youthId = youthId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getMiddleName() { return middleName; }
    public void setMiddleName(String middleName) { this.middleName = middleName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getSuffix() { return suffix; }
    public void setSuffix(String suffix) { this.suffix = suffix; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBirthday() { return birthday; }
    public void setBirthday(String birthday) { this.birthday = birthday; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getCompleteAddress() { return completeAddress; }
    public void setCompleteAddress(String completeAddress) { this.completeAddress = completeAddress; }

    public String getCivilStatus() { return civilStatus; }
    public void setCivilStatus(String civilStatus) { this.civilStatus = civilStatus; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }

    public String getYouthClassification() { return youthClassification; }
    public void setYouthClassification(String youthClassification) { this.youthClassification = youthClassification; }

    public String getEducationBackground() { return educationBackground; }
    public void setEducationBackground(String educationBackground) { this.educationBackground = educationBackground; }

    public String getWorkStatus() { return workStatus; }
    public void setWorkStatus(String workStatus) { this.workStatus = workStatus; }

    public Boolean getSkVoter() { return skVoter; }
    public void setSkVoter(Boolean skVoter) { this.skVoter = skVoter; }

    public Boolean getNationalVoter() { return nationalVoter; }
    public void setNationalVoter(Boolean nationalVoter) { this.nationalVoter = nationalVoter; }

    public Boolean getPastVoter() { return pastVoter; }
    public void setPastVoter(Boolean pastVoter) { this.pastVoter = pastVoter; }

    public Integer getNumAttendedAssemblies() { return numAttendedAssemblies; }
    public void setNumAttendedAssemblies(Integer numAttendedAssemblies) { this.numAttendedAssemblies = numAttendedAssemblies; }

    public String getNonAttendanceReason() { return nonAttendanceReason; }
    public void setNonAttendanceReason(String nonAttendanceReason) { this.nonAttendanceReason = nonAttendanceReason; }
}
