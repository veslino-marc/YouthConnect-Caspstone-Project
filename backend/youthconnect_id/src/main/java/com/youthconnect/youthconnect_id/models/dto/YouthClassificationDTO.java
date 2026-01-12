package com.youthconnect.youthconnect_id.models.dto;

public class YouthClassificationDTO {
    private String youthClassification;
    private String educationBackground;
    private String workStatus;
    private Boolean skVoter = false;
    private Boolean nationalVoter = false;
    private Boolean pastVoter = false;
    private Integer numAttendedAssemblies = 0;
    private String nonAttendanceReason;

    // Explicit getters and setters for compatibility
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
