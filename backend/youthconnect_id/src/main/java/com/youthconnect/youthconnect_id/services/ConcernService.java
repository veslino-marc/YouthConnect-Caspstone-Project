package com.youthconnect.youthconnect_id.services;

import com.youthconnect.youthconnect_id.models.Concern;
import com.youthconnect.youthconnect_id.models.dto.ConcernDTO;

import java.util.List;
import java.util.Optional;

public interface ConcernService {
    Concern createConcern(ConcernDTO concernDTO);

    List<Concern> getAllConcerns();

    Optional<Concern> getConcernById(Integer id);

    List<Concern> getConcernsByYouthId(Integer youthId);

    List<Concern> getConcernsByStatus(String status);

    Concern updateConcernStatus(Integer id, String status);

    void deleteConcern(Integer id);
}