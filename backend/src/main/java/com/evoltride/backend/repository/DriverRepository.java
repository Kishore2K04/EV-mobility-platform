package com.evoltride.backend.repository;

import com.evoltride.backend.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DriverRepository extends JpaRepository<Driver, Long> {

    boolean existsByEmail(String email);

    Optional<Driver> findByEmail(String email);

}