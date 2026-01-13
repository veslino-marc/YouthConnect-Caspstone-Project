package com.youthconnect.youthconnect_id.controllers;

import com.youthconnect.youthconnect_id.models.Concern;
import com.youthconnect.youthconnect_id.models.ConcernUpdate;
import com.youthconnect.youthconnect_id.models.dto.ConcernDTO;
import com.youthconnect.youthconnect_id.services.ConcernService;
import com.youthconnect.youthconnect_id.repositories.ConcernUpdateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/concerns")
public class ConcernController {

    @Autowired
    private ConcernService concernService;

    @Autowired
    private ConcernUpdateRepository concernUpdateRepository;

    @PostMapping
    public ResponseEntity<Concern> createConcern(@RequestBody ConcernDTO concernDTO) {
        try {
            System.out.println("=== Received Concern DTO ===");
            System.out.println("Youth ID: " + concernDTO.getYouthId());
            System.out.println("Type: " + concernDTO.getTypeOfConcern());
            System.out.println("Title: " + concernDTO.getTitle());
            System.out.println("Description: " + concernDTO.getDescription());
            
            Concern concern = concernService.createConcern(concernDTO);
            
            System.out.println("=== Concern Created Successfully ===");
            System.out.println("Concern ID: " + concern.getConcernId());
            
            return new ResponseEntity<>(concern, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("=== ERROR CREATING CONCERN ===");
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Concern>> getAllConcerns() {
        List<Concern> concerns = concernService.getAllConcerns();
        return new ResponseEntity<>(concerns, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Concern> getConcernById(@PathVariable Integer id) {
        Optional<Concern> concern = concernService.getConcernById(id);
        return concern.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/youth/{youthId}")
    public ResponseEntity<List<Concern>> getConcernsByYouthId(@PathVariable Integer youthId) {
        List<Concern> concerns = concernService.getConcernsByYouthId(youthId);
        return new ResponseEntity<>(concerns, HttpStatus.OK);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Concern>> getConcernsByStatus(@PathVariable String status) {
        List<Concern> concerns = concernService.getConcernsByStatus(status);
        return new ResponseEntity<>(concerns, HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Concern> updateConcernStatus(@PathVariable Integer id, @RequestBody String status) {
        Concern concern = concernService.updateConcernStatus(id, status.replace("\"", ""));
        if (concern != null) {
            return new ResponseEntity<>(concern, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConcern(@PathVariable Integer id) {
        concernService.deleteConcern(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{concernId}/updates")
    public ResponseEntity<ConcernUpdate> saveConcernUpdate(@PathVariable Integer concernId, @RequestBody Map<String, Object> request) {
        try {
            String updateText = (String) request.get("updateText");
            Integer updatedByAdminId = null;
            
            Object adminIdObj = request.get("updatedByAdminId");
            if (adminIdObj != null) {
                if (adminIdObj instanceof Integer) {
                    updatedByAdminId = (Integer) adminIdObj;
                } else if (adminIdObj instanceof Number) {
                    updatedByAdminId = ((Number) adminIdObj).intValue();
                }
            }
            
            if (updateText == null || updateText.trim().isEmpty()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            ConcernUpdate concernUpdate = new ConcernUpdate();
            concernUpdate.setConcernId(concernId);
            concernUpdate.setUpdateText(updateText);
            if (updatedByAdminId != null) {
                concernUpdate.setUpdatedByAdminId(updatedByAdminId);
            }
            
            ConcernUpdate savedUpdate = concernUpdateRepository.save(concernUpdate);
            return new ResponseEntity<>(savedUpdate, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
