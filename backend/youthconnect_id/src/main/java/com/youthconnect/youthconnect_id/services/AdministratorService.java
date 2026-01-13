package com.youthconnect.youthconnect_id.services;

import com.youthconnect.youthconnect_id.models.Administrator;
import com.youthconnect.youthconnect_id.repositories.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class AdministratorService {
    
    @Autowired
    private AdministratorRepository administratorRepository;
    
    // Get all administrators
    public List<Administrator> getAllAdministrators() {
        return administratorRepository.findAll();
    }
    
    // Get administrator by ID
    public Optional<Administrator> getAdministratorById(Integer id) {
        return administratorRepository.findById(id);
    }
    
    // Get administrator by email
    public Administrator getAdministratorByEmail(String email) {
        return administratorRepository.findByEmail(email);
    }
    
    // Get administrator by username
    public Administrator getAdministratorByUsername(String username) {
        return administratorRepository.findByUsername(username);
    }
    
    // Create new administrator
    public Administrator createAdministrator(Administrator administrator) {
        administrator.setIsActive(true);
        administrator.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return administratorRepository.save(administrator);
    }
    
    // Update administrator
    public Administrator updateAdministrator(Integer id, Administrator administratorDetails) {
        Optional<Administrator> administratorOpt = administratorRepository.findById(id);
        if (administratorOpt.isEmpty()) {
            return null;
        }
        
        Administrator administrator = administratorOpt.get();
        
        if (administratorDetails.getUsername() != null) {
            administrator.setUsername(administratorDetails.getUsername());
        }
        if (administratorDetails.getEmail() != null) {
            administrator.setEmail(administratorDetails.getEmail());
        }
        if (administratorDetails.getPasswordHash() != null) {
            administrator.setPasswordHash(administratorDetails.getPasswordHash());
        }
        if (administratorDetails.getIsActive() != null) {
            administrator.setIsActive(administratorDetails.getIsActive());
        }
        
        return administratorRepository.save(administrator);
    }
    
    // Delete administrator
    public boolean deleteAdministrator(Integer id) {
        if (administratorRepository.existsById(id)) {
            administratorRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Deactivate administrator (soft delete)
    public Administrator deactivateAdministrator(Integer id) {
        Optional<Administrator> administratorOpt = administratorRepository.findById(id);
        if (administratorOpt.isEmpty()) {
            return null;
        }
        
        Administrator administrator = administratorOpt.get();
        administrator.setIsActive(false);
        return administratorRepository.save(administrator);
    }
    
    // Activate administrator
    public Administrator activateAdministrator(Integer id) {
        Optional<Administrator> administratorOpt = administratorRepository.findById(id);
        if (administratorOpt.isEmpty()) {
            return null;
        }
        
        Administrator administrator = administratorOpt.get();
        administrator.setIsActive(true);
        return administratorRepository.save(administrator);
    }
}
