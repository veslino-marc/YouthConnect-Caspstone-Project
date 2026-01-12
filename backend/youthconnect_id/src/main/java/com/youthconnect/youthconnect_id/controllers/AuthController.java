package com.youthconnect.youthconnect_id.controllers;

import com.youthconnect.youthconnect_id.models.User;
import com.youthconnect.youthconnect_id.models.Admin;
import com.youthconnect.youthconnect_id.models.YouthProfile;
import com.youthconnect.youthconnect_id.models.dto.LoginResponseDTO;
import com.youthconnect.youthconnect_id.repositories.UserRepository;
import com.youthconnect.youthconnect_id.repositories.AdminRepository;
import com.youthconnect.youthconnect_id.repositories.YouthProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private YouthProfileRepository youthProfileRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("=== Login Request ===");
        System.out.println("Email: " + loginRequest.getEmail());
        System.out.println("Role received: '" + loginRequest.getRole() + "'");
        System.out.println("Role is null? " + (loginRequest.getRole() == null));
        System.out.println("Password: " + loginRequest.getPassword());
        
        if ("youth".equals(loginRequest.getRole())) {
            System.out.println("Authenticating as YOUTH MEMBER from tbl_user");
            User user = userRepository.findByEmail(loginRequest.getEmail());
            if (user != null) {
                System.out.println("User found: " + user.getEmail());
                System.out.println("Password hash from DB: " + user.getPasswordHash());
                if (user.getPasswordHash().equals(loginRequest.getPassword())) {
                    System.out.println("Password matches!");
                    
                    // Fetch youth profile using userId as youthId
                    YouthProfile youthProfile = youthProfileRepository.findById(user.getUserId()).orElse(null);
                    
                    LoginResponseDTO response = new LoginResponseDTO();
                    response.setUserId(user.getUserId());
                    response.setEmail(user.getEmail());
                    response.setRole("youth");
                    
                    if (youthProfile != null) {
                        response.setYouthId(youthProfile.getYouthId());
                        response.setFirstName(youthProfile.getFirstName());
                        response.setMiddleName(youthProfile.getMiddleName());
                        response.setLastName(youthProfile.getLastName());
                    }
                    
                    return ResponseEntity.ok(response);
                } else {
                    System.out.println("Password does not match!");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
                }
            } else {
                System.out.println("User not found!");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        }
        else if ("sk".equals(loginRequest.getRole())) {
            System.out.println("Authenticating as SK OFFICIAL from tbl_admin");
            Admin admin = adminRepository.findByEmail(loginRequest.getEmail());
            if (admin != null) {
                System.out.println("Admin found: " + admin.getEmail());
                System.out.println("Password hash from DB: " + admin.getPasswordHash());
                if (admin.getPasswordHash().equals(loginRequest.getPassword())) {
                    System.out.println("Password matches!");
                    return ResponseEntity.ok(admin);
                } else {
                    System.out.println("Password does not match!");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
                }
            } else {
                System.out.println("Admin not found with email: " + loginRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        }
        
        System.out.println("Invalid role! Role: '" + loginRequest.getRole() + "'");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role: " + loginRequest.getRole());
    }
}

class LoginRequest {
    private String email;
    private String password;
    private String role;

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }
}
