package com.youthconnect.youthconnect_id.repositories;

import com.youthconnect.youthconnect_id.models.YouthClassification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YouthClassificationRepository extends JpaRepository<YouthClassification, Integer> {
}
