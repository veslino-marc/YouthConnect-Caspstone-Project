package com.youthconnect.youthconnect_id.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class YouthProfileDTO {
    private String firstName;
    private String middleName;
    private String lastName;
    private String suffix;
    private String gender;
    private String birthday; // Accepts date as String, will be converted in service
    private String contactNumber;
    private String completeAddress;
    private String civilStatus;
    private YouthClassificationDTO classification;
}
