package com.youthconnect.youthconnect_id.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class YouthClassificationDTO {
    private String youthClassification;
    private String educationBackground;
    private String workStatus;
    private Boolean skVoter = false;
    private Boolean nationalVoter = false;
    private Boolean pastVoter = false;
    private Integer numAttendedAssemblies = 0;
    private String nonAttendanceReason;
}
