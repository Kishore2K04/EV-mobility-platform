package com.evoltride.backend.repository;

import com.evoltride.backend.entity.Rider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RiderRepository extends JpaRepository<Rider, Long> {

    boolean existsByEmail(String email);

}