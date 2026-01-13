package com.youthconnect.youthconnect_id.controllers;

import com.youthconnect.youthconnect_id.models.Admin;
import com.youthconnect.youthconnect_id.repositories.AdminRepository;
import com.youthconnect.youthconnect_id.utils.PasswordUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {
    
    @Autowired
    private AdminRepository adminRepository;
    
    // Get all admins
    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminRepository.findAll();
        return ResponseEntity.ok(admins);
    }
    
    // Get admin by ID
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Integer id) {
        Optional<Admin> admin = adminRepository.findById(id);
        if (admin.isPresent()) {
            return ResponseEntity.ok(admin.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    
    // Create new admin
    @PostMapping
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        try {
            admin.setRoleId(2); // Role ID 2 = SK Official
            admin.setIsActive(true);
            admin.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            admin.setPasswordHash(PasswordUtil.hashPassword(admin.getPasswordHash())); // Hash password
            
            Admin savedAdmin = adminRepository.save(admin);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    // Update admin
    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Integer id, @RequestBody Admin adminDetails) {
        Optional<Admin> adminOpt = adminRepository.findById(id);
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        Admin admin = adminOpt.get();
        if (adminDetails.getFirstName() != null) {
            admin.setFirstName(adminDetails.getFirstName());
        }
        if (adminDetails.getLastName() != null) {
            admin.setLastName(adminDetails.getLastName());
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
        
        Admin updatedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(updatedAdmin);
    }
    
    // Delete admin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Integer id) {
        Optional<Admin> admin = adminRepository.findById(id);
        if (admin.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        adminRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    
    // Deactivate admin (soft delete)
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Admin> deactivateAdmin(@PathVariable Integer id) {
        Optional<Admin> adminOpt = adminRepository.findById(id);
        if (adminOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        Admin admin = adminOpt.get();
        admin.setIsActive(false);
        Admin updatedAdmin = adminRepository.save(admin);
        return ResponseEntity.ok(updatedAdmin);
    }
}
