package com.youthconnect.youthconnect_id.repositories;

import com.youthconnect.youthconnect_id.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
