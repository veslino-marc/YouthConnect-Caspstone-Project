package com.youthconnect.youthconnect_id.repositories;

import com.youthconnect.youthconnect_id.models.Concern;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConcernRepository extends JpaRepository<Concern, Integer> {
    List<Concern> findByYouthId(Integer youthId);

    List<Concern> findByStatus(String status);
}