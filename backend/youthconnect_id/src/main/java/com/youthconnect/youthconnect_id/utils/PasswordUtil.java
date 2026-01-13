package com.youthconnect.youthconnect_id.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordUtil {
    
    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    
    /**
     * Hash a plain text password using BCrypt
     */
    public static String hashPassword(String plainPassword) {
        return encoder.encode(plainPassword);
    }
    
    /**
     * Verify a plain text password against a hashed password
     */
    public static boolean verifyPassword(String plainPassword, String hashedPassword) {
        // Support both plain text (legacy) and BCrypt hashed passwords
        if (hashedPassword.startsWith("$2a$") || hashedPassword.startsWith("$2b$") || hashedPassword.startsWith("$2y$")) {
            // BCrypt hashed password
            return encoder.matches(plainPassword, hashedPassword);
        } else {
            // Plain text password (legacy support)
            return plainPassword.equals(hashedPassword);
        }
    }
}
