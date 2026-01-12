package com.youthconnect.youthconnect_id.services;

import com.youthconnect.youthconnect_id.models.YouthProfile;
import com.youthconnect.youthconnect_id.models.dto.YouthProfileDTO;
import com.youthconnect.youthconnect_id.models.dto.YouthProfileWithClassificationDTO;
import java.util.List;
import java.util.Optional;

public interface YouthProfileService {
    YouthProfile registerYouth(YouthProfileDTO youthProfileDTO);
    
    List<YouthProfile> getAllYouthProfiles();
    
    List<YouthProfileWithClassificationDTO> getAllYouthProfilesWithClassification();
    
    Optional<YouthProfile> getYouthProfileById(Integer id);
    
    Optional<YouthProfileWithClassificationDTO> getYouthProfileWithClassificationById(Integer id);
    
    YouthProfile updateYouthProfile(Integer id, YouthProfileDTO youthProfileDTO);
    
    YouthProfile updateYouthProfileWithClassification(Integer id, YouthProfileDTO youthProfileDTO);
    
    void deleteYouthProfile(Integer id);
}
