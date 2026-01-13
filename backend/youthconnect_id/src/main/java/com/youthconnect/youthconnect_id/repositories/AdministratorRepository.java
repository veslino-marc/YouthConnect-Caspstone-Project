package com.youthconnect.youthconnect_id.repositories;

import com.youthconnect.youthconnect_id.models.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {
    Administrator findByEmail(String email);
    Administrator findByUsername(String username);
}
