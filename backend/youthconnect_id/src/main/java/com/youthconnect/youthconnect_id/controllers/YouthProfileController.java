package com.youthconnect.youthconnect_id.controllers;

import com.youthconnect.youthconnect_id.models.YouthProfile;
import com.youthconnect.youthconnect_id.models.dto.YouthProfileDTO;
import com.youthconnect.youthconnect_id.services.YouthProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/youth-profile")
@CrossOrigin(origins = "http://localhost:4200")
public class YouthProfileController {
    
    @Autowired
    private YouthProfileService youthProfileService;
    
    @PostMapping("/register")
    public ResponseEntity<YouthProfile> registerYouth(@RequestBody YouthProfileDTO youthProfileDTO) {
        try {
            System.out.println("Received registration request:");
            System.out.println("Profile data: " + youthProfileDTO);
            System.out.println("Classification data: " + youthProfileDTO.getClassification());
            
            YouthProfile registeredYouth = youthProfileService.registerYouth(youthProfileDTO);
            return new ResponseEntity<>(registeredYouth, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Registration error: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<YouthProfile>> getAllYouthProfiles() {
        List<YouthProfile> profiles = youthProfileService.getAllYouthProfiles();
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<YouthProfile> getYouthProfileById(@PathVariable Integer id) {
        Optional<YouthProfile> profile = youthProfileService.getYouthProfileById(id);
        return profile.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<YouthProfile> updateYouthProfile(@PathVariable Integer id, 
                                                           @RequestBody YouthProfileDTO youthProfileDTO) {
        try {
            YouthProfile updatedProfile = youthProfileService.updateYouthProfile(id, youthProfileDTO);
            return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteYouthProfile(@PathVariable Integer id) {
        try {
            youthProfileService.deleteYouthProfile(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
