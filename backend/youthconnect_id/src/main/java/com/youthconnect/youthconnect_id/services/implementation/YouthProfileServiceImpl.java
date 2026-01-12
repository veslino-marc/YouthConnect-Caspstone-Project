package com.youthconnect.youthconnect_id.services.implementation;

import com.youthconnect.youthconnect_id.models.YouthProfile;
import com.youthconnect.youthconnect_id.models.YouthClassification;
import com.youthconnect.youthconnect_id.models.dto.YouthProfileDTO;
import com.youthconnect.youthconnect_id.models.dto.YouthProfileWithClassificationDTO;
import com.youthconnect.youthconnect_id.repositories.YouthProfileRepository;
import com.youthconnect.youthconnect_id.repositories.YouthClassificationRepository;
import com.youthconnect.youthconnect_id.services.YouthProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class YouthProfileServiceImpl implements YouthProfileService {
    
    @Autowired
    private YouthProfileRepository youthProfileRepository;
    
    @Autowired
    private YouthClassificationRepository youthClassificationRepository;
    
    @Override
    @Transactional
    public YouthProfile registerYouth(YouthProfileDTO youthProfileDTO) {
        // Save youth profile
        YouthProfile youthProfile = new YouthProfile();
        youthProfile.setFirstName(youthProfileDTO.getFirstName());
        youthProfile.setMiddleName(youthProfileDTO.getMiddleName());
        youthProfile.setLastName(youthProfileDTO.getLastName());
        youthProfile.setSuffix(youthProfileDTO.getSuffix());
        youthProfile.setGender(youthProfileDTO.getGender());
        
        // Convert birthday string to LocalDate
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        youthProfile.setBirthday(LocalDate.parse(youthProfileDTO.getBirthday(), formatter));
        
        youthProfile.setContactNumber(youthProfileDTO.getContactNumber());
        youthProfile.setCompleteAddress(youthProfileDTO.getCompleteAddress());
        youthProfile.setCivilStatus(youthProfileDTO.getCivilStatus());
        
        YouthProfile savedProfile = youthProfileRepository.save(youthProfile);
        
        // Save youth classification if provided
        if (youthProfileDTO.getClassification() != null) {
            YouthClassification classification = new YouthClassification();
            classification.setYouthId(savedProfile.getYouthId());
            classification.setYouthClassification(youthProfileDTO.getClassification().getYouthClassification());
            classification.setEducationBackground(youthProfileDTO.getClassification().getEducationBackground());
            classification.setWorkStatus(youthProfileDTO.getClassification().getWorkStatus());
            classification.setSkVoter(youthProfileDTO.getClassification().getSkVoter() != null ? youthProfileDTO.getClassification().getSkVoter() : false);
            classification.setNationalVoter(youthProfileDTO.getClassification().getNationalVoter() != null ? youthProfileDTO.getClassification().getNationalVoter() : false);
            classification.setPastVoter(youthProfileDTO.getClassification().getPastVoter() != null ? youthProfileDTO.getClassification().getPastVoter() : false);
            classification.setNumAttendedAssemblies(youthProfileDTO.getClassification().getNumAttendedAssemblies() != null ? youthProfileDTO.getClassification().getNumAttendedAssemblies() : 0);
            classification.setNonAttendanceReason(youthProfileDTO.getClassification().getNonAttendanceReason());
            
            System.out.println("Saving classification for youth_id: " + savedProfile.getYouthId());
            System.out.println("Classification data: " + classification);
            
            youthClassificationRepository.save(classification);
        } else {
            System.out.println("No classification data provided in DTO");
        }
        
        return savedProfile;
    }
    
    @Override
    public List<YouthProfile> getAllYouthProfiles() {
        return youthProfileRepository.findAll();
    }
    
    @Override
    public List<YouthProfileWithClassificationDTO> getAllYouthProfilesWithClassification() {
        List<YouthProfile> profiles = youthProfileRepository.findAll();
        return profiles.stream().map(profile -> {
            YouthProfileWithClassificationDTO dto = new YouthProfileWithClassificationDTO();
            dto.setYouthId(profile.getYouthId());
            dto.setFirstName(profile.getFirstName());
            dto.setMiddleName(profile.getMiddleName());
            dto.setLastName(profile.getLastName());
            dto.setSuffix(profile.getSuffix());
            dto.setGender(profile.getGender());
            dto.setBirthday(profile.getBirthday().toString());
            dto.setContactNumber(profile.getContactNumber());
            dto.setCompleteAddress(profile.getCompleteAddress());
            dto.setCivilStatus(profile.getCivilStatus());
            dto.setCreatedAt(profile.getCreatedAt() != null ? profile.getCreatedAt().toString() : null);
            dto.setUpdatedAt(profile.getUpdatedAt() != null ? profile.getUpdatedAt().toString() : null);
            
            // Get classification if exists
            Optional<YouthClassification> classification = youthClassificationRepository.findById(profile.getYouthId());
            classification.ifPresent(c -> {
                dto.setYouthClassification(c.getYouthClassification());
                dto.setEducationBackground(c.getEducationBackground());
                dto.setWorkStatus(c.getWorkStatus());
                dto.setSkVoter(c.getSkVoter());
                dto.setNationalVoter(c.getNationalVoter());
                dto.setPastVoter(c.getPastVoter());
                dto.setNumAttendedAssemblies(c.getNumAttendedAssemblies());
                dto.setNonAttendanceReason(c.getNonAttendanceReason());
            });
            
            return dto;
        }).collect(Collectors.toList());
    }
    
    @Override
    public Optional<YouthProfile> getYouthProfileById(Integer id) {
        return youthProfileRepository.findById(id);
    }
    
    @Override
    public Optional<YouthProfileWithClassificationDTO> getYouthProfileWithClassificationById(Integer id) {
        Optional<YouthProfile> profileOpt = youthProfileRepository.findById(id);
        if (profileOpt.isEmpty()) {
            return Optional.empty();
        }
        
        YouthProfile profile = profileOpt.get();
        YouthProfileWithClassificationDTO dto = new YouthProfileWithClassificationDTO();
        dto.setYouthId(profile.getYouthId());
        dto.setFirstName(profile.getFirstName());
        dto.setMiddleName(profile.getMiddleName());
        dto.setLastName(profile.getLastName());
        dto.setSuffix(profile.getSuffix());
        dto.setGender(profile.getGender());
        dto.setBirthday(profile.getBirthday().toString());
        dto.setContactNumber(profile.getContactNumber());
        dto.setCompleteAddress(profile.getCompleteAddress());
        dto.setCivilStatus(profile.getCivilStatus());
        dto.setCreatedAt(profile.getCreatedAt() != null ? profile.getCreatedAt().toString() : null);
        dto.setUpdatedAt(profile.getUpdatedAt() != null ? profile.getUpdatedAt().toString() : null);
        
        // Get classification if exists
        Optional<YouthClassification> classification = youthClassificationRepository.findById(id);
        classification.ifPresent(c -> {
            dto.setYouthClassification(c.getYouthClassification());
            dto.setEducationBackground(c.getEducationBackground());
            dto.setWorkStatus(c.getWorkStatus());
            dto.setSkVoter(c.getSkVoter());
            dto.setNationalVoter(c.getNationalVoter());
            dto.setPastVoter(c.getPastVoter());
            dto.setNumAttendedAssemblies(c.getNumAttendedAssemblies());
            dto.setNonAttendanceReason(c.getNonAttendanceReason());
        });
        
        return Optional.of(dto);
    }
    
    @Override
    public YouthProfile updateYouthProfile(Integer id, YouthProfileDTO youthProfileDTO) {
        YouthProfile youthProfile = youthProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Youth profile not found"));
        
        youthProfile.setFirstName(youthProfileDTO.getFirstName());
        youthProfile.setMiddleName(youthProfileDTO.getMiddleName());
        youthProfile.setLastName(youthProfileDTO.getLastName());
        youthProfile.setSuffix(youthProfileDTO.getSuffix());
        youthProfile.setGender(youthProfileDTO.getGender());
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        youthProfile.setBirthday(LocalDate.parse(youthProfileDTO.getBirthday(), formatter));
        
        youthProfile.setContactNumber(youthProfileDTO.getContactNumber());
        youthProfile.setCompleteAddress(youthProfileDTO.getCompleteAddress());
        youthProfile.setCivilStatus(youthProfileDTO.getCivilStatus());
        
        return youthProfileRepository.save(youthProfile);
    }
    
    @Override
    @Transactional
    public YouthProfile updateYouthProfileWithClassification(Integer id, YouthProfileDTO youthProfileDTO) {
        YouthProfile youthProfile = youthProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Youth profile not found"));
        
        // Update profile fields
        youthProfile.setFirstName(youthProfileDTO.getFirstName());
        youthProfile.setMiddleName(youthProfileDTO.getMiddleName());
        youthProfile.setLastName(youthProfileDTO.getLastName());
        youthProfile.setSuffix(youthProfileDTO.getSuffix());
        youthProfile.setGender(youthProfileDTO.getGender());
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        youthProfile.setBirthday(LocalDate.parse(youthProfileDTO.getBirthday(), formatter));
        
        youthProfile.setContactNumber(youthProfileDTO.getContactNumber());
        youthProfile.setCompleteAddress(youthProfileDTO.getCompleteAddress());
        youthProfile.setCivilStatus(youthProfileDTO.getCivilStatus());
        
        YouthProfile savedProfile = youthProfileRepository.save(youthProfile);
        
        // Update or create classification
        if (youthProfileDTO.getClassification() != null) {
            Optional<YouthClassification> existingClassification = youthClassificationRepository.findById(id);
            YouthClassification classification;
            
            if (existingClassification.isPresent()) {
                classification = existingClassification.get();
            } else {
                classification = new YouthClassification();
                classification.setYouthId(id);
            }
            
            classification.setYouthClassification(youthProfileDTO.getClassification().getYouthClassification());
            classification.setEducationBackground(youthProfileDTO.getClassification().getEducationBackground());
            classification.setWorkStatus(youthProfileDTO.getClassification().getWorkStatus());
            classification.setSkVoter(youthProfileDTO.getClassification().getSkVoter() != null ? youthProfileDTO.getClassification().getSkVoter() : false);
            classification.setNationalVoter(youthProfileDTO.getClassification().getNationalVoter() != null ? youthProfileDTO.getClassification().getNationalVoter() : false);
            classification.setPastVoter(youthProfileDTO.getClassification().getPastVoter() != null ? youthProfileDTO.getClassification().getPastVoter() : false);
            classification.setNumAttendedAssemblies(youthProfileDTO.getClassification().getNumAttendedAssemblies() != null ? youthProfileDTO.getClassification().getNumAttendedAssemblies() : 0);
            classification.setNonAttendanceReason(youthProfileDTO.getClassification().getNonAttendanceReason());
            
            youthClassificationRepository.save(classification);
        }
        
        return savedProfile;
    }
    
    @Override
    @Transactional
    public void deleteYouthProfile(Integer id) {
        // Delete classification first (if exists)
        youthClassificationRepository.deleteById(id);
        // Then delete profile
        youthProfileRepository.deleteById(id);
    }
}
