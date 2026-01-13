package com.youthconnect.youthconnect_id.repositories;

import com.youthconnect.youthconnect_id.models.ConcernUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConcernUpdateRepository extends JpaRepository<ConcernUpdate, Integer> {
    List<ConcernUpdate> findByConcernId(Integer concernId);
    List<ConcernUpdate> findByConcernIdIn(List<Integer> concernIds);
}
