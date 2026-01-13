package com.youthconnect.youthconnect_id.controllers;

import com.youthconnect.youthconnect_id.models.Administrator;
import com.youthconnect.youthconnect_id.repositories.AdministratorRepository;
import com.youthconnect.youthconnect_id.utils.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/administrator")
@CrossOrigin(origins = "http://localhost:4200")
public class AdministratorController {
    
    @Autowired
    private AdministratorRepository administratorRepository;
    
    // Get all administrators
    @GetMapping
    public ResponseEntity<List<Administrator>> getAllAdministrators() {
        List<Administrator> administrators = administratorRepository.findAll();
        return ResponseEntity.ok(administrators);
    }
    
    // Get administrator by ID
    @GetMapping("/{id}")
    public ResponseEntity<Administrator> getAdministratorById(@PathVariable Integer id) {
        Optional<Administrator> administrator = administratorRepository.findById(id);
        if (administrator.isPresent()) {
            return ResponseEntity.ok(administrator.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    
    // Create new administrator
    @PostMapping
    public ResponseEntity<Administrator> createAdministrator(@RequestBody Administrator administrator) {
        try {
            administrator.setIsActive(true);
            administrator.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            administrator.setPasswordHash(PasswordUtil.hashPassword(administrator.getPasswordHash())); // Hash password
            
            Administrator savedAdmin = administratorRepository.save(administrator);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    // Update administrator
    @PutMapping("/{id}")
    public ResponseEntity<Administrator> updateAdministrator(@PathVariable Integer id, @RequestBody Administrator adminDetails) {
        Optional<Administrator> adminOpt = administratorRepository.findById(id);
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        Administrator admin = adminOpt.get();
        if (adminDetails.getUsername() != null) {
            admin.setUsername(adminDetails.getUsername());
        }
        if (adminDetails.getEmail() != null) {
            admin.setEmail(adminDetails.getEmail());
        }
        if (adminDetails.getPasswordHash() != null && !adminDetails.getPasswordHash().isEmpty()) {
            admin.setPasswordHash(PasswordUtil.hashPassword(adminDetails.getPasswordHash())); // Hash new password
        }
        if (adminDetails.getIsActive() != null) {
            admin.setIsActive(adminDetails.getIsActive());
        }
        
        Administrator updatedAdmin = administratorRepository.save(admin);
        return ResponseEntity.ok(updatedAdmin);
    }
    
    // Delete administrator
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdministrator(@PathVariable Integer id) {
        Optional<Administrator> admin = administratorRepository.findById(id);
        if (admin.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        administratorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    // Deactivate administrator (soft delete)
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Administrator> deactivateAdministrator(@PathVariable Integer id) {
        Optional<Administrator> adminOpt = administratorRepository.findById(id);
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        Administrator admin = adminOpt.get();
        admin.setIsActive(false);
        Administrator updatedAdmin = administratorRepository.save(admin);
        return ResponseEntity.ok(updatedAdmin);
    }

    // Activate administrator
    @PutMapping("/{id}/activate")
    public ResponseEntity<Administrator> activateAdministrator(@PathVariable Integer id) {
        Optional<Administrator> adminOpt = administratorRepository.findById(id);
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        Administrator admin = adminOpt.get();
        admin.setIsActive(true);
        Administrator updatedAdmin = administratorRepository.save(admin);
        return ResponseEntity.ok(updatedAdmin);
    }
}
