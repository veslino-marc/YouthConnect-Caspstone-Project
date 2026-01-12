package com.youthconnect.youthconnect_id.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
