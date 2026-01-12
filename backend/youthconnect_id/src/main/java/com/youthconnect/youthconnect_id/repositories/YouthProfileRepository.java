package com.youthconnect.youthconnect_id.repositories;

import com.youthconnect.youthconnect_id.models.YouthProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface YouthProfileRepository extends JpaRepository<YouthProfile, Integer> {
    Optional<YouthProfile> findByContactNumber(String contactNumber);
}
