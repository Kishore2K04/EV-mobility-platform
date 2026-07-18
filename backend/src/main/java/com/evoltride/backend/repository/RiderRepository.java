package com.evoltride.backend.repository;

import com.evoltride.backend.entity.Rider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RiderRepository extends JpaRepository<Rider, Long> {

    Optional<Rider> findByEmail(String email);

    boolean existsByEmail(String email);

}