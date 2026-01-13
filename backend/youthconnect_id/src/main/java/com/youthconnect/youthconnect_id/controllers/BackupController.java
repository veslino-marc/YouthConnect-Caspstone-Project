package com.youthconnect.youthconnect_id.controllers;

import com.youthconnect.youthconnect_id.services.BackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/backup")
@CrossOrigin(origins = "http://localhost:4200")
public class BackupController {

    @Autowired
    private BackupService backupService;

    @PostMapping("/create")
    public ResponseEntity<Resource> createBackup() {
        try {
            String backupContent = backupService.createBackup();
            
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));
            String filename = "youthconnect_backup_" + timestamp + ".sql";
            
            ByteArrayResource resource = new ByteArrayResource(backupContent.getBytes());
            
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .contentLength(backupContent.length())
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/restore")
    public ResponseEntity<?> restoreBackup(@RequestParam("file") MultipartFile file) {
        try {
            String content = new String(file.getBytes());
            backupService.restoreBackup(content);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Database restored successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to restore backup: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<List<Map<String, String>>> listBackups() {
        // For now, return empty list since we're doing direct downloads
        // In a full implementation, you'd store backups on the server
        return ResponseEntity.ok(List.of());
    }
}
